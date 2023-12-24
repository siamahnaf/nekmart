import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { Request } from "express";

//Service
import { UserService } from "./user.service";

//Entity
import { SuccessInfo } from "./entities/success.entity";
import { User, GetUsers } from "./entities/user.entity";

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

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

//Req User Types
import { ReqUser } from "@/auth/entities/user.types";

@Resolver()
export class UserResolver {
    //Constructor
    constructor(
        private readonly userService: UserService
    ) { };

    //Get Profile
    @Query(() => User, { name: "getProfile" })
    @UseGuards(AuthGuard)
    getProfile(
        @Context("user") reqUser: ReqUser
    ) {
        return this.userService.getProfile(reqUser);
    };

    //Get Users
    @Query(() => GetUsers, { name: "getUsers" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.userService.getUsers(searchInput);
    };

    //Get Admins
    @Query(() => GetUsers, { name: "getAdmins" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getAdmins(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.userService.getAdmins(searchInput);
    };

    //Signup
    @Mutation(() => SuccessInfo, { name: "signup" })
    signup(
        @Args("signupInput") signupInput: SignupInput
    ) {
        return this.userService.signup(signupInput);
    };

    //Add admins
    @Mutation(() => SuccessInfo, { name: "addAdmins" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addAdmin(
        @Args("adminInput") adminInput: AdminInput
    ) {
        return this.userService.addAdmin(adminInput);
    };

    //Resend otp
    @Mutation(() => SuccessInfo, { name: "resendOtp" })
    resend(
        @Args("phone", { type: () => String }) phone: string
    ) {
        return this.userService.resend(phone);
    }

    //Phone login
    @Mutation(() => SuccessInfo, { name: "phoneLogin" })
    phoneLogin(
        @Args("phone", { type: () => String }) phone: string
    ) {
        return this.userService.phoneLogin(phone);
    }

    //Phone verify
    @Mutation(() => SuccessInfo, { name: "verifyPhone" })
    verify(
        @Args("verifyPhoneInput") verifyPhoneInput: VerifyPhoneInput,
        @Context("req") req: Request
    ) {
        return this.userService.verify(verifyPhoneInput, req);
    };

    //Login with phone and password
    @Mutation(() => SuccessInfo, { name: "login" })
    login(
        @Args("loginInput") loginInput: LoginInput,
        @Context("req") req: Request
    ) {
        return this.userService.login(loginInput, req);
    };

    //Login with phone and password for admin
    @Mutation(() => SuccessInfo, { name: "loginAdmin" })
    adminLogin(
        @Args("loginInput") loginInput: LoginInput,
        @Context("req") req: Request
    ) {
        return this.userService.adminLogin(loginInput, req)
    };

    //Login with phone and password for seller
    @Mutation(() => SuccessInfo, { name: "loginSeller" })
    sellerLogin(
        @Args("loginInput") loginInput: LoginInput,
        @Context("req") req: Request
    ) {
        return this.userService.sellerLogin(loginInput, req)
    };

    //Login or signup with google service
    @Mutation(() => SuccessInfo, { name: "googleLogin" })
    google(
        @Args("googleInput") googleInput: GoogleInput,
        @Context("req") req: Request
    ) {
        return this.userService.google(googleInput, req);
    };

    //Login or signup with facebook service
    @Mutation(() => SuccessInfo, { name: "facebookLogin" })
    facebook(
        @Args("facebookInput") facebookInput: FacebookInput,
        @Context("req") req: Request
    ) {
        return this.userService.facebook(facebookInput, req);
    };

    //Update Profile
    @Mutation(() => SuccessInfo, { name: "updateProfile" })
    @UseGuards(AuthGuard)
    update(
        @Args("updateUserInput") updateUserInput: UpdateUserInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.userService.update(updateUserInput, reqUser);
    };

    //Change Password
    @Mutation(() => SuccessInfo, { name: "changePassword" })
    @UseGuards(AuthGuard)
    changePassword(
        @Args("changePasswordInput") changePasswordInput: ChangePasswordInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.userService.changePassword(changePasswordInput, reqUser);
    };

    //Forget Password
    @Mutation(() => SuccessInfo, { name: "forgetPassword" })
    forgetPassword(
        @Args("forgetPasswordInput") forgetPasswordInput: ForgetPasswordInput
    ) {
        return this.userService.forgetPassword(forgetPasswordInput);
    };

    //Reset Password
    @Mutation(() => SuccessInfo, { name: "resetPassword" })
    resetPassword(
        @Args("resetPasswordInput") resetPasswordInput: ResetPasswordInput
    ) {
        return this.userService.resetPassword(resetPasswordInput);
    };

    //Phone Availability
    @Mutation(() => SuccessInfo, { name: "phoneAvailability" })
    @UseGuards(AuthGuard)
    available(
        @Args("phoneInput") phoneInput: PhoneInput
    ) {
        return this.userService.available(phoneInput);
    };

    //Phone Change
    @Mutation(() => SuccessInfo, { name: "changePhone" })
    @UseGuards(AuthGuard)
    changePhone(
        @Args("phoneInput") phoneInput: PhoneInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.userService.phoneChange(phoneInput, reqUser);
    };

    //Phone Verify an Change
    @Mutation(() => SuccessInfo, { name: "changePhoneVerify" })
    @UseGuards(AuthGuard)
    changePhoneVerify(
        @Args("verifyPhoneInput") verifyPhoneInput: VerifyPhoneInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.userService.changePhoneVerify(verifyPhoneInput, reqUser);
    };

    //Ban users
    @Mutation(() => SuccessInfo, { name: "banOrUnbannedUser" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    ban(
        @Args("id", { type: () => String }) id: string,
        @Args("status", { type: () => Boolean }) status: boolean
    ) {
        return this.userService.ban(id, status);
    };

    //Remove Admin
    @Mutation(() => SuccessInfo, { name: "removeAdmin" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    remove(
        @Args("id", { type: () => String }) id: string
    ) {
        return this.userService.remove(id);
    };
}