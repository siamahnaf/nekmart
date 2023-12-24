import { SuccessInfo } from "../Success.types";

export interface FacebookLoginData {
    facebookLogin: SuccessInfo;
}

export interface GoogleLoginData {
    googleInput: SuccessInfo;
}

export interface PhoneNumberLogin {
    phoneLogin: SuccessInfo;
}

export interface VerifyPhoneNumber {
    verifyPhone: SuccessInfo;
}

export interface ResendOtpData {
    resendOtp: SuccessInfo;
}

export interface PasswordLoginData {
    login: SuccessInfo;
}

export interface ForgetPasswordData {
    forgetPassword: SuccessInfo;
}

export interface ResetPasswordData {
    resetPassword: SuccessInfo;
}

export interface RegistrationData {
    signup: SuccessInfo;
}