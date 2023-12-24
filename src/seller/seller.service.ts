import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as speakeasy from "speakeasy";
import { catchError, firstValueFrom } from "rxjs";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";

//Orm Entity
import { Seller } from "./model/seller.entity";
import { Bank } from "./model/bank.entity";
import { User } from "@/user/model/user.entity";

//Sent Sms
import { sentSms } from "@/helper/sms.helper";

//Dto
import { SellerInput } from "./dto/seller.dto";
import { BankInput } from "./dto/bank.dto";
import { SearchInput } from "@/user/dto/search.dto";
import { SellerVerifyInput } from "./dto/verify.dto";
import { UpdateSellerInput } from "./dto/update.dto";

//Types
import { ReqUser } from "@/auth/entities/user.types";


@Injectable()
export class SellerService {
    //Constructor
    constructor(
        @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
        @InjectRepository(Bank) private bankRepository: Repository<Bank>,
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly httpService: HttpService,
    ) { };

    //Get Sellers for client
    async gets(searchInput: SearchInput) {
        const sellers = await this.sellerRepository
            .createQueryBuilder("seller")
            .leftJoinAndSelect("seller.user", "user")
            .orderBy("seller.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            sellers.where("LOWER(seller.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }
        const { items, meta } = await paginate<Seller>(sellers, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get sellers for admin
    async getsByAdmin(searchInput: SearchInput) {
        const sellers = await this.sellerRepository
            .createQueryBuilder("seller")
            .leftJoinAndSelect("seller.bank", "bank")
            .leftJoinAndSelect("seller.user", "user")
            .orderBy("seller.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            sellers.where("LOWER(seller.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }
        const { items, meta } = await paginate<Seller>(sellers, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get seller for client
    async get(id: string) {
        const seller = await this.sellerRepository.findOne({
            where: {
                id,
                is_banned: false,
                is_verified: true
            }
        })
        if (!seller) throw new NotFoundException("Seller not found!");
        return seller;
    };

    //Get seller for admin
    async getByAdmin(id: string) {
        const seller = await this.sellerRepository.findOne({
            where: {
                id
            },
            relations: {
                bank: true
            }
        })
        if (!seller) throw new NotFoundException("Seller not found!");
        return seller;
    };

    //Get seller profile
    async getProfile(reqUser: ReqUser) {
        const seller = await this.sellerRepository.findOne({
            where: {
                user: { id: reqUser.id }
            },
            relations: {
                bank: true
            }
        });
        if (!seller) throw new NotFoundException("Seller not found!");
        return seller;
    };

    //Create seller
    async create(sellerInput: SellerInput) {
        const seller = await this.sellerRepository.findOneBy({
            shopName: sellerInput.shopName,
            phone: sellerInput.phone
        });
        if (seller) throw new NotFoundException("Seller already registered! Please try again with different name or phone!");
        const user = await this.userRepository.findOneBy({
            phone: sellerInput.phone,
            is_verified: true
        });
        if (user) throw new NotFoundException("User already registered!");
        await this.userRepository.delete({
            phone: sellerInput.phone,
            is_verified: false
        });
        const secret = speakeasy.generateSecret({ length: 20 });
        const otp = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        });
        console.log(otp)
        const smsData = await sentSms(sellerInput.phone, `${otp} is your security code for nekmart. Do not share security code with others. This code will be expired in 5 minutes.`);
        const { data } = await firstValueFrom(
            this.httpService.post("http://api.greenweb.com.bd/api.php", smsData).pipe(
                catchError((error: AxiosError) => {
                    throw new NotFoundException("Something Went Wrong!")
                })
            )
        );
        if (!data.toString().includes("Ok:")) throw new NotFoundException(data.toString());
        const passwordHash = await bcrypt.hash(sellerInput.password, 12);
        const newUser = this.userRepository.create({
            name: sellerInput.shopName,
            phone: sellerInput.phone,
            password: passwordHash,
            otp: secret.base32
        });
        await this.userRepository.save(newUser);
        return {
            success: true,
            message: "Please verify your phone number!"
        }
    }

    //Verify seller phone number
    async verifyPhone(sellerVerifyInput: SellerVerifyInput) {
        const user = await this.userRepository.findOne({
            where: {
                phone: sellerVerifyInput.phone
            },
            select: ["id", "phone", "otp", "password"]
        })
        if (!user) throw new NotFoundException("You use an expired code!");
        var validOtp = speakeasy.totp.verify({
            secret: user.otp,
            encoding: 'base32',
            token: sellerVerifyInput.otp,
            window: 10
        });
        if (!validOtp) throw new NotFoundException("You use wrong code!");
        await this.userRepository.update(user.id, {
            is_verified: true,
            otp: null,
            role: "seller"
        });
        const newSeller = this.sellerRepository.create({
            ...sellerVerifyInput,
            user: { id: user.id }
        });
        await this.sellerRepository.save(newSeller);
        return {
            success: true,
            message: "Seller registration successful!"
        };
    }

    //Update seller
    async update(id: string, updateSellerInput: UpdateSellerInput) {
        const seller = await this.sellerRepository.findOneBy({
            id
        });
        if (!seller) throw new NotFoundException("Seller not found!");
        if (seller.shopName !== updateSellerInput.shopName) {
            const hasSeller = await this.sellerRepository.findOneBy({
                shopName: updateSellerInput.shopName
            });
            if (hasSeller) throw new NotFoundException("Please choose different shop name!");
        }
        await this.sellerRepository.update(seller.id, updateSellerInput);
        return {
            success: true,
            message: "Your information updated successfully!"
        }
    }

    //Banned seller
    async ban(id: string, status: boolean) {
        const updated = await this.sellerRepository.update(id, {
            is_banned: status
        })
        if (updated.affected === 0) throw new NotFoundException("Seller not found!");
        //Need to Disable all products under this seller
        return {
            success: true,
            message: `Seller ${status ? "banned" : "unbanned"} successfully!`
        }
    }

    //Seller verification
    async verify(id: string) {
        const updated = await this.sellerRepository.update(id, {
            is_verified: true
        })
        if (updated.affected === 0) throw new NotFoundException("Seller information not found!");
        return {
            success: true,
            message: "Seller verified successfully!"
        }
    }

    //Add bank information
    async bank(bankInput: BankInput, reqUser: ReqUser) {
        const seller = await this.sellerRepository.findOneBy({
            user: { id: reqUser.id }
        });
        if (!seller) throw new NotFoundException("Seller not found!");
        const newBankInfo = await this.bankRepository.create({
            ...bankInput,
            seller: { id: seller.id }
        })
        await this.bankRepository.save(newBankInfo);
        return {
            success: true,
            message: "Bank information added successfully!"
        }
    }
}