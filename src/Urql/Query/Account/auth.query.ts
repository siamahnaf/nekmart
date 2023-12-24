import { gql } from "urql";

export const FACEBOOK_LOGIN = gql`
mutation facebookLogin($facebookInput: FacebookInput!) {
    facebookLogin(facebookInput: $facebookInput) {
      success
      message
    }
}
`;

export const GOOGLE_LOGIN = gql`
mutation googleLogin($googleInput: GoogleInput!) {
    googleLogin(googleInput: $googleInput) {
      success
      message
    }
}
`;

export const PHONE_NUMBER_LOGIN = gql`
mutation phoneLogin($phone: String!) {
    phoneLogin(phone: $phone) {
      success
      message
    }
}
`;

export const VERIFY_PHONE_NUMBER = gql`
mutation verifyPhone($verifyPhoneInput: VerifyPhoneInput!){
  verifyPhone(verifyPhoneInput: $verifyPhoneInput) {
    success
    message
  }
}
`;

export const RESEND_OTP = gql`
mutation resendOtp($phone: String!) {
  resendOtp(phone: $phone) {
    success
    message
  }
}
`;

export const PASSWORD_LOGIN = gql`
mutation login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    success
    message
  }
}
`;

export const FORGET_PASSWORD = gql`
mutation forgetPassword($forgetPasswordInput: ForgetPasswordInput!) {
  forgetPassword(forgetPasswordInput: $forgetPasswordInput) {
    success
    message
  }
}
`;

export const RESET_PASSWORD = gql`
mutation resetPassword($resetPasswordInput: ResetPasswordInput!) {
  resetPassword(resetPasswordInput: $resetPasswordInput) {
    success
    message
  }
}
`;

export const REGISTRATION = gql`
mutation signup($signupInput: SignupInput!) {
  signup(signupInput: $signupInput) {
    success
    message
  }
}
`;