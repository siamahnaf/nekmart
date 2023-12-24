import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import nextBase64 from "next-base64";
import moment from "moment";

//Component
import Container from "../Common/Container";
import { Notification } from "../Common/Notifications";
import FacebookLogin from "./LoginForm/FacebookLogin";
import GoogleLogin from "./LoginForm/GoogleLogin";

//Urql
import { useMutation } from "urql";
import { PHONE_NUMBER_LOGIN } from "@/Urql/Query/Account/auth.query";
import { PhoneNumberLogin } from "@/Urql/Types/Account/auth.types";

//Interface
interface Inputs {
    phone: string;
}

const LoginForm = () => {
    //Initializing Hook
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ error, fetching }, mutate] = useMutation<PhoneNumberLogin>(PHONE_NUMBER_LOGIN);

    //Initialize Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();

    //Form Submission
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ phone: "88" + value.phone }).then(({ error, data }) => {
            if (error) {
                setNotification(true)
            }
            if (data?.phoneLogin.success) {
                router.push(`/account/verification?token=${nextBase64.encode(value.phone)}&expires=${moment().add(5, 'minutes').unix()}`)
            }
        }).catch(() => {
            setNotification(true)
        })
    };

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <section>
            <Container className="py-14">
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    severity="error"
                >
                    {error?.message}
                </Notification>
                <div className="w-[45%] mx-auto text-center border border-solid border-gray-200 px-8 py-8 rounded-md">
                    <h4 className="text-lg font-semibold uppercase mb-4">Login</h4>
                    <FacebookLogin />
                    <GoogleLogin />
                    <div className="mt-4">
                        <Link href="/account/old-login" className="bg-main py-2.5 text-center w-full text-white block rounded-md">
                            Login with User ID
                        </Link>
                    </div>
                    <div className="my-4 flex items-center gap-1 whitespace-nowrap after:border-t after:border-gray-300 after:relative after:w-full after:left-0 before:border-t before:border-gray-300 before:relative before:w-full before:left-0">
                        <span>Or</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h6 className="mb-5">Enter your mobile number!</h6>
                        <Input
                            label="Phone Number"
                            crossOrigin="anonymous"
                            color="red"
                            {...register("phone", {
                                required: true,
                                pattern: /^0\d{10}$/
                            })}
                            error={errors.phone ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                        />
                        <div className="mt-5">
                            <button className="bg-main w-full uppercase font-semibold py-3 text-white rounded-md text-sm relative" type="submit" disabled={fetching}>
                                Login with OTP
                                <div className="absolute top-1/2 -translate-y-1/2 right-5">
                                    {fetching &&
                                        <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                    }
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default LoginForm;