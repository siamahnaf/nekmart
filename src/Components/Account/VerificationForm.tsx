import { useState } from "react";
import { useRouter } from "next/router";
import nextBase64 from "next-base64";
import OtpInput from "react-otp-input";
import { Otptimer } from "otp-timer-ts";

//Component
import { Notification } from "../Common/Notifications";
import Container from "../Common/Container";

//Urql
import { useMutation } from "urql";
import { VERIFY_PHONE_NUMBER, RESEND_OTP } from "@/Urql/Query/Account/auth.query";
import { VerifyPhoneNumber, ResendOtpData } from "@/Urql/Types/Account/auth.types";

const VerificationForm = () => {
    //Initialize Hook
    const router = useRouter();

    //State
    const [otp, setOtp] = useState<string>("");
    const [verify, setVerify] = useState<boolean>(false);
    const [resend, setResend] = useState<boolean>(false);

    //Urql
    const [{ error: verifyError, fetching: verifyFetching }, verifyMutate] = useMutation<VerifyPhoneNumber>(VERIFY_PHONE_NUMBER);
    const [{ data: resendData, error: resendError, fetching: resendFetching }, resendMutate] = useMutation<ResendOtpData>(RESEND_OTP);

    //Decode Message
    const phone = nextBase64.decode(router.query.token as string);

    //Handler Resend
    const handleResend = () => {
        resendMutate({ phone: "88" + phone }).then(() => {
            setResend(true)
        }).catch(() => {
            setResend(true)
        })
    }

    //Handle Submit
    const handleSubmit = () => {
        verifyMutate({ verifyPhoneInput: { phone: "88" + phone, otp: otp } }).then(({ error, data }) => {
            if (error) {
                setVerify(true)
            }
            if (data?.verifyPhone.success) {
                router.push("/")
            }
        }).catch(() => {
            setVerify(true)
        })
    }

    //Handler -- notification
    const onVerify = () => {
        setVerify(false);
    };
    //Handler -- notification
    const onResend = () => {
        setResend(false);
    };

    return (
        <section>
            <Notification
                open={resend}
                handleClose={onResend}
                severity={resendError?.message ? "error" : "success"}
            >
                {resendError?.message ?? resendData?.resendOtp.message}
            </Notification>
            <Notification
                open={verify}
                handleClose={onVerify}
                severity="error"
            >
                {verifyError?.message}
            </Notification>
            <Container className="py-14">
                <div className="w-[45%] mx-auto text-center border border-solid border-gray-200 px-8 py-8 rounded-md">
                    <h4 className="text-lg font-semibold uppercase mb-4">Verify your number!</h4>
                    <p className="mb-8">
                        We&apos;ve sent an OTP in your phone +88{phone?.replace(phone?.slice(5, -2), phone?.slice(1, -5).replace(/./g, "*"))}
                    </p>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        placeholder="------"
                        renderInput={(props) => <input {...props} className="!w-full !mx-[5px] !text-2xl !px-2 !py-3 rounded-md border border-solid border-black placeholder:text-black placeholder:font-light focus:outline-main" inputMode="text" />}
                    />
                    <div className="mt-8 mb-5">
                        <button className={`bg-main w-full uppercase font-semibold py-3 text-white rounded-md text-sm relative ${otp.length < 6 ? "opacity-60" : ""}`} type="button" disabled={verifyFetching || otp.length < 6} onClick={handleSubmit}>
                            Login with OTP
                            <div className="absolute top-1/2 -translate-y-1/2 right-5">
                                {verifyFetching &&
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                }
                            </div>
                        </button>
                    </div>
                    <Otptimer
                        minutes={0}
                        seconds={60}
                        onResend={handleResend}
                        text="Resend otp after"
                        showSpinner
                        fetching={resendFetching}
                        spinnerComponent={<div className="w-3 h-3 border-b-2 border-main rounded-full animate-spin mt-px"></div>}
                        buttonClass="flex gap-2 items-center justify-center w-full"
                    />
                </div>
            </Container>
        </section>
    );
};

export default VerificationForm;