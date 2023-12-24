import { useState, Fragment } from "react";
import { Dialog } from "@material-tailwind/react";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";

//Components
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation } from "urql";
import { VERIFY_SELLER_PHONE } from "@/Urql/Query/Seller/seller.query";
import { VerifySellerPhone } from "@/Urql/Types/Seller/seller.types";

//Interface
interface Inputs {
    shopName: string;
    phone: string;
    password: string;
    logo: string;
    banner: string;
    address: string;
    metaTitle: string;
    metaDescription: string;
}
interface Props {
    open: boolean;
    onClose: () => void;
    data: Inputs
}

const SellerVerify = ({ open, onClose, data }: Props) => {
    //Initializing
    const router = useRouter();

    //State
    const [otp, setOtp] = useState<string>("");
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ fetching, error }, mutate] = useMutation<VerifySellerPhone>(VERIFY_SELLER_PHONE);

    // On Submit
    const onSubmit = () => {
        const formData = {
            ...data,
            otp,
            phone: "88" + data.phone,

        }
        mutate({ sellerVerifyInput: formData }).then(({ error, data }) => {
            if (error) {
                setNotification(true)
            }
            if (data?.verifySellerPhone.success) {
                router.push("https://seller.nekmart.com")
            }
        }).catch(() => {
            setNotification(true)
        })
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <Fragment>
            <Dialog
                open={open}
                handler={() => { }}
                size="md"
            >
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    severity="error"
                >
                    {error?.message}
                </Notification>
                <div className="text-black p-6 text-center">
                    <h4 className="text-xl uppercase font-medium text-main mb-4">Please verify your phone number!</h4>
                    <p className="text-[15px] mb-8">We&apos;ve sent an OTP in your phone  +88{data.phone?.replace(data.phone?.slice(5, -2), data.phone?.slice(1, -5).replace(/./g, "*"))}</p>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        placeholder="------"
                        renderInput={(props) => <input {...props} className="!w-full !mx-[5px] !text-2xl !px-2 !py-3 rounded-md border border-solid border-black placeholder:text-black placeholder:font-light focus:outline-main" inputMode="text" />}
                    />
                    <div className="mt-8">
                        <button className="bg-main uppercase font-semibold py-2 text-white px-5 rounded-md text-sm relative" type="submit" disabled={fetching} onClick={onSubmit}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Submit Now</span>
                            <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                {fetching &&
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                }
                            </div>
                        </button>
                    </div>
                </div>
            </Dialog>
        </Fragment>
    );
};

export default SellerVerify;