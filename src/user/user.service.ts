import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as speakeasy from "speakeasy";
import { OAuth2Client, LoginTicket } from "google-auth-library";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";
import { catchError, firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

//Config Service
const configService = new ConfigService();

//Helpers
import { sentSms } from "@/helper/sms.helper";

//Orm Entity
import { User } from "./model/user.entity";
import { Session } from "./model/session.entity";

//Google oAuth Authentication
const client = new OAuth2Client(
    configService.get<string>("GOOGLE_ID"),
    configService.get<string>("GOOGLE_SECRET"),
    "postmessage"
);

//Dto
import { SignupInput } from "./dto/signup.dto";
import { VerifyPhoneInput } from "./dto/verify-phone.dto";
import { LoginInput } from "./dto/login.dto";
import { GoogleInput } from "./dto/google.dto";
import { FacebookInput } from "./dto/facebook.dto";
import { UpdateUserInput } from "./dto/update.dto";
import { ChangePasswordInput } from "./dto/change-password.dto";
import { ForgetPasswordInput } from "./dto/forget-password.dto";
import { ResetPasswordInput } from "./dto/reset-password.dto";
import { PhoneInput } from "./dto/phone.dto";
import { SearchInput } from "./dto/search.dto";
import { AdminInput } from "./dto/admin.dto";

//Req User Types
import { ReqUser } from "@/auth/entities/user.types";

@Injectable()
export class UserService {
    //Constructor
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Session) private sessionRepository: Repository<Session>,
        private readonly httpService: HttpService,
        private readonly jwtService: JwtService
    ) { };

    //Get Profile
    async getProfile(reqUser: ReqUser) {
        const user = await this.userRepository.findOneBy({
            id: reqUser.id,
            is_verified: true
        })
        return user;
    };

    //Get Users
    async getUsers(searchInput: SearchInput) {
        const users = await this.userRepository
            .createQueryBuilder("user")
            .orderBy("user.created_at", searchInput.orderBy ?? "DESC")
            .where("user.is_verified = :isVerified AND user.role = :role", { isVerified: true, role: "user" })

        if (searchInput.search) {
            users.where("LOWER(user.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<User>(users, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Get admins
    async getAdmins(searchInput: SearchInput) {
        const users = await this.userRepository
            .createQueryBuilder("user")
            .orderBy("user.created_at", searchInput.orderBy ?? "DESC")
            .where("user.is_verified = :isVerified", { isVerified: true })
            .andWhere("user.role IN (:...roles)", { roles: ["editor", "moderator", "admin"] })

        if (searchInput.search) {
            users.where("LOWER(user.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<User>(users, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Signup
    async signup(signupInput: SignupInput) {
        const user = await this.userRepository.findOneBy({
            phone: signupInput.phone,
            is_verified: true
        })
        if (user) throw new NotFoundException("User already registered!");
        await this.userRepository.delete({
            phone: signupInput.phone,
            is_verified: false
        })
        const secret = speakeasy.generateSecret({ length: 20 });
        const otp = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        });
        const smsData = await sentSms(signupInput.phone, `${otp} is your security code for nekmart. Do not share security code with others. This code will be expired in 5 minutes.`);
        const { data } = await firstValueFrom(
            this.httpService.post("http://api.greenweb.com.bd/api.php", smsData).pipe(
                catchError((error: AxiosError) => {
                    throw new NotFoundException("Something Went Wrong!")
                })
            )
        );
        if (!data.toString().includes("Ok:")) throw new NotFoundException(data.toString());
        console.log(otp);
        const passwordHash = await bcrypt.hash(signupInput.password, 12);
        const newUser = this.userRepository.create({
            ...signupInput,
            password: passwordHash,
            otp: secret.base32
        });
        await this.userRepository.save(newUser);
        return {
            success: true,
            message: "Code sent to your phone successfully!"
        }
    };

    //Add Admins
    async addAdmin(adminInput: AdminInput) {
        const user = await this.userRepository.findOneBy({
            phone: adminInput.phone,
            is_verified: true
        })
        if (user) throw new NotFoundException("User already registered!");
        await this.userRepository.delete({
            phone: adminInput.phone,
            is_verified: false
        })
        const passwordHash = await bcrypt.hash(adminInput.password, 12);
        const newUser = this.userRepository.create({
            ...adminInput,
            password: passwordHash,
            is_verified: true
        });
        await this.userRepository.save(newUser);
        return {
            success: true,
            message: `${adminInput.role} added successfully!`
        }
    }

    //Resend otp
    async resend(phone: string) {
        const user = await this.userRepository.findOneBy({
            phone: phone
        });
        if (!user) throw new NotFoundException("User not found!");
        const secret = speakeasy.generateSecret({ length: 20 });
        const otp = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        });
        const smsData = await sentSms(phone, `${otp} is your security code for nekmart. Do not share security code with others. This code will be expired in 5 minutes.`);
        const { data } = await firstValueFrom(
            this.httpService.post("http://api.greenweb.com.bd/api.php", smsData).pipe(
                catchError((error: AxiosError) => {
                    throw new NotFoundException("Something Went Wrong!")
                })
            )
        );
        if (!data.toString().includes("Ok:")) throw new NotFoundException(data.toString());
        await this.userRepository.update(user.id, { otp: secret.base32 })
        return {
            success: true,
            message: "Otp send successfully!"
        }
    }

    //Phone login
    async phoneLogin(phone: string) {
        const user = await this.userRepository.findOneBy({
            phone: phone
        });
        const secret = speakeasy.generateSecret({ length: 20 });
        const otp = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        });
        const smsData = await sentSms(phone, `${otp} is your security code for nekmart. Do not share security code with others. This code will be expired in 5 minutes.`);
        const { data } = await firstValueFrom(
            this.httpService.post("http://api.greenweb.com.bd/api.php", smsData).pipe(
                catchError((error: AxiosError) => {
                    throw new NotFoundException("Something Went Wrong!")
                })
            )
        );
        if (!data.toString().includes("Ok:")) throw new NotFoundException(data.toString());
        if (user) {
            await this.userRepository.update(user.id, { otp: secret.base32 })
        } else {
            const newUser = await this.userRepository.create({ phone: phone, otp: secret.base32 });
            await this.userRepository.save(newUser);
        }
        return {
            success: true,
            message: "Code send successfully!"
        }
    }

    //Verify Phone
    async verify(verifyPhoneInput: VerifyPhoneInput, req: Request) {
        const user = await this.userRepository.findOne({
            where: {
                phone: verifyPhoneInput.phone
            },
            select: ["id", "phone", "otp", "password"]
        })
        if (!user) throw new NotFoundException("You use an expired code!");
        var validOtp = speakeasy.totp.verify({
            secret: user.otp,
            encoding: 'base32',
            token: verifyPhoneInput.otp,
            window: 10
        });
        if (!validOtp) throw new NotFoundException("You use wrong code!");
        const token = this.jwtService.sign({ phone: user.phone, id: user.id })
        const session = await this.sessionRepository.create({
            cookie: token,
            user: { id: user.id }
        })
        await this.sessionRepository.save(session);
        req.res.cookie("9717f25d01fb469d5d6a3c6c70e1919aebec", token, {
            maxAge: 90 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });
        await this.userRepository.update(user.id, { is_verified: true, otp: null })
        return {
            success: true,
            message: "User registered successfully!"
        }
    };

    //Login with phone or password
    async login(loginInput: LoginInput, req: Request) {
        const user = await this.userRepository.findOne({
            where: [
                { phone: loginInput.phoneOrEmail },
                { email: loginInput.phoneOrEmail }
            ],
            select: ["id", "phone", "password"]
        })
        if (!user) throw new NotFoundException("Wrong email or password!");
        const verifyPass = await bcrypt.compare(loginInput.password, user.password);
        if (!verifyPass) throw new NotFoundException("Wrong email or password!");
        const token = this.jwtService.sign({ phone: user.phone, id: user.id })
        const session = await this.sessionRepository.create({
            cookie: token,
            user: { id: user.id }
        })
        await this.sessionRepository.save(session);
        req.res.cookie("9717f25d01fb469d5d6a3c6c70e1919aebec", token, {
            maxAge: 90 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });
        return {
            success: true,
            message: "User login successfully!"
        }
    };

    //Login with email and password for admin
    async adminLogin(loginInput: LoginInput, req: Request) {
        const user = await this.userRepository.findOne({
            where: [
                { phone: loginInput.phoneOrEmail },
                { email: loginInput.phoneOrEmail }
            ],
            select: ["id", "phone", "password", "role"]
        });
        if (!user) throw new NotFoundException("Wrong email or password!");
        if (user.role === "user" || user.role === "seller") throw new NotFoundException("You can't login here!");
        const verifyPass = await bcrypt.compare(loginInput.password, user.password);
        if (!verifyPass) throw new NotFoundException("Wrong email or password!");
        const token = this.jwtService.sign({ phone: user.phone, id: user.id })
        const session = await this.sessionRepository.create({
            cookie: token,
            user: { id: user.id }
        })
        await this.sessionRepository.save(session);
        req.res.cookie("9717f25d01fb469d5d6a3c6c70e1919aebec", token, {
            maxAge: 90 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });
        return {
            success: true,
            message: "Admin login successfully!"
        }
    };

    //Login with phone and password for seller
    async sellerLogin(loginInput: LoginInput, req: Request) {
        const user = await this.userRepository.findOne({
            where: [
                { phone: loginInput.phoneOrEmail },
                { email: loginInput.phoneOrEmail }
            ],
            select: ["id", "phone", "password", "role"]
        })
        if (!user) throw new NotFoundException("Wrong email or password!");
        if (user.role !== "seller") throw new NotFoundException("You can't login here!");
        const verifyPass = await bcrypt.compare(loginInput.password, user.password);
        if (!verifyPass) throw new NotFoundException("Wrong email or password!");
        const token = this.jwtService.sign({ phone: user.phone, id: user.id })
        const session = await this.sessionRepository.create({
            cookie: token,
            user: { id: user.id }
        })
        await this.sessionRepository.save(session);
        req.res.cookie("9717f25d01fb469d5d6a3c6c70e1919aebec", token, {
            maxAge: 90 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });
        return {
            success: true,
            message: "Seller login successfully!"
        }
    };

    //Login or signup with google service
    async google({ code, idToken }: GoogleInput, req: Request) {
        if (code && idToken) throw new NotFoundException("You can sent only code or idToken")
        let id_token
        if (code) {
            const { tokens } = await client.getToken(code)
            id_token = tokens.id_token
        } else {
            id_token = idToken
        }
        const clientId = process.env.GOOGLE_ID
        const ticket: LoginTicket = await client.verifyIdToken({ idToken: id_token, audience: clientId });
        const payload = ticket.getPayload();
        const user = await this.userRepository.findOneBy({
            email: payload.email
        })
        const token = this.jwtService.sign({ phone: user.phone, id: user.id })
        const session = await this.sessionRepository.create({
            cookie: token,
            user: { id: user.id }
        })
        await this.sessionRepository.save(session);
        req.res.cookie("9717f25d01fb469d5d6a3c6c70e1919aebec", token, {
            maxAge: 90 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });
        if (!user) {
            const newUser = this.userRepository.create({
                name: payload.name,
                email: payload.email,
                is_verified: true,
                avatar: payload.picture,
                provider: {
                    name: payload.iss,
                    id: payload.sub
                }
            });
            await this.userRepository.save(newUser);
            return {
                success: true,
                message: "Authentication successful!"
            }
        } else {
            return {
                success: true,
                message: "Authentication successful!"
            }
        }
    };

    //Login or signup with facebook service
    async facebook({ userId, accessToken }: FacebookInput, req: Request) {
        let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userId}/?fields=id,name,picture,email&access_token=${accessToken}`;
        const { data } = await firstValueFrom(
            this.httpService.get(urlGraphFacebook).pipe(
                catchError((error: AxiosError) => {
                    throw new NotFoundException("Something Went Wrong!")
                })
            )
        );
        const user = await this.userRepository.findOneBy({
            email: data.id
        })
        const token = this.jwtService.sign({ phone: user.phone, id: user.id })
        const session = await this.sessionRepository.create({
            cookie: token,
            user: { id: user.id }
        })
        await this.sessionRepository.save(session);
        req.res.cookie("9717f25d01fb469d5d6a3c6c70e1919aebec", token, {
            maxAge: 90 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });
        if (!user) {
            const newUser = this.userRepository.create({
                name: data.name,
                email: data.id,
                avatar: data.picture.data.url,
                is_verified: true,
                provider: {
                    name: "graph.facebook.com",
                    id: data.id
                }
            })
            await this.userRepository.save(newUser);
            return {
                success: true,
                message: "Authentication successful!"
            }
        } else {
            return {
                success: true,
                message: "Authentication successful!"
            }
        }
    };

    //Update Profile
    async update(updateUserInput: UpdateUserInput, reqUser: ReqUser) {
        const user = await this.userRepository.findOneBy({
            id: reqUser.id
        });
        if (!user) throw new NotFoundException("User update failed!");
        if (user.email !== updateUserInput.email) {
            const hasEmail = await this.userRepository.findOneBy({
                email: updateUserInput.email
            })
            if (hasEmail) throw new NotFoundException("Email is already in use!")
        }
        await this.userRepository.update(reqUser.id, updateUserInput);
        return {
            success: true,
            message: "User updated successfully!"
        }
    };

    //Change Password
    async changePassword(changePasswordInput: ChangePasswordInput, reqUser: ReqUser) {
        const user = await this.userRepository.findOne({
            where: {
                id: reqUser.id
            },
            select: ["id", "phone", "password"]
        })
        const verifyPass = await bcrypt.compare(changePasswordInput.oldPassword, user.password);
        if (!verifyPass) throw new NotFoundException("Your password is wrong");
        const passwordHash = await bcrypt.hash(changePasswordInput.newPassword, 12);
        await this.userRepository.update(user.id, { password: passwordHash })
        return {
            success: true,
            message: "Password changed successfully!"
        }
    };

    //Forget Password
    async forgetPassword(forgetPasswordInput: ForgetPasswordInput) {
        const user = await this.userRepository.findOneBy({
            phone: forgetPasswordInput.phone
        });
        if (!user) throw new NotFoundException("No user found with this phone!");
        const secret = speakeasy.generateSecret({ length: 20 });
        const otp = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        });
        const smsData = await sentSms(forgetPasswordInput.phone, `${otp} is your security code for nekmart. Do not share security code with others. This code will be expired in 5 minutes.`);
        const { data } = await firstValueFrom(
            this.httpService.post("http://api.greenweb.com.bd/api.php", smsData).pipe(
                catchError((error: AxiosError) => {
                    throw new NotFoundException("Something Went Wrong!")
                })
            )
        );
        if (!data.toString().includes("Ok:")) throw new NotFoundException(data.toString());
        await this.userRepository.update(user.id, { otp: secret.base32 })
        return {
            success: true,
            message: "Verification code sent successfully!"
        }
    };

    //Reset Password
    async resetPassword(resetPasswordInput: ResetPasswordInput) {
        const user = await this.userRepository.findOne({
            where: {
                phone: resetPasswordInput.phone
            },
            select: ["id", "phone", "otp", "password"]
        })
        if (!user) throw new NotFoundException("No user found with this phone!");
        if (!user.otp) throw new NotFoundException("Something went wrong!")
        var validOtp = speakeasy.totp.verify({
            secret: user.otp,
            encoding: 'base32',
            token: resetPasswordInput.code,
            window: 10
        });
        if (!validOtp) throw new NotFoundException("You use wrong code!");
        const passwordHash = await bcrypt.hash(resetPasswordInput.password, 12);
        await this.userRepository.update(user.id, { password: passwordHash, otp: null });
        return {
            success: true,
            message: "Password resets successfully!"
        }
    };

    //Phone Availability
    async available(phoneInput: PhoneInput) {
        const user = await this.userRepository.findOneBy({
            phone: phoneInput.phone
        });
        if (user) return {
            success: false,
            message: "Phone is already in use!"
        }
        return {
            success: true,
            message: "Phone can be used!"
        }
    };

    //Phone Change
    async phoneChange(phoneInput: PhoneInput, reqUser: ReqUser) {
        const user = await this.userRepository.findOneBy({
            phone: phoneInput.phone
        });
        if (user) throw new NotFoundException("Phone is already in use!");
        const secret = speakeasy.generateSecret({ length: 20 });
        const otp = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        });
        const smsData = await sentSms(phoneInput.phone, `${otp} is your security code for nekmart. Do not share security code with others. This code will be expired in 5 minutes.`);
        const { data } = await firstValueFrom(
            this.httpService.post("http://api.greenweb.com.bd/api.php", smsData).pipe(
                catchError((error: AxiosError) => {
                    throw new NotFoundException("Something Went Wrong!")
                })
            )
        );
        if (!data.toString().includes("Ok:")) throw new NotFoundException(data.toString());
        await this.userRepository.update(reqUser.id, { otp: secret.base32 });
        return {
            success: true,
            message: "Verification code sent"
        }
    };

    //Phone Change Verify
    async changePhoneVerify(verifyPhoneInput: VerifyPhoneInput, reqUser: ReqUser) {
        const usedPhone = await this.userRepository.findOneBy({
            phone: verifyPhoneInput.phone
        });
        if (usedPhone) throw new NotFoundException("Phone is already in use!");
        const user = await this.userRepository.findOne({
            where: {
                id: reqUser.id
            },
            select: ["id", "phone", "password", "otp"]
        })
        var validOtp = speakeasy.totp.verify({
            secret: user.otp,
            encoding: 'base32',
            token: verifyPhoneInput.otp,
            window: 10
        });
        if (!validOtp) throw new NotFoundException("You use wrong code!");
        await this.userRepository.update(user.id, { otp: null, phone: verifyPhoneInput.phone });
        return {
            success: true,
            message: "Phone Changed successfully!"
        }
    };

    //Delete User
    async ban(id: string, status: boolean) {
        const result = await this.userRepository.update(id, {
            is_banned: status
        })
        if (result.affected === 0) throw new NotFoundException("User not found!")
        return {
            success: true,
            message: `Account ${status ? "banned" : "unbanned"} successfully!`
        }
    }

    //Remove Admin
    async remove(id: string) {
        const result = await this.userRepository.update(id, {
            is_banned: true,
            role: "user"
        })
        if (result.affected === 0) throw new NotFoundException("User not found!")
        return {
            success: true,
            message: `Account removed successfully!`
        }
    }
}