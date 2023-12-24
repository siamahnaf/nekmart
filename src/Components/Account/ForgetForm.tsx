import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import nextBase64 from "next-base64";

//Container
import { Notification } from "../Common/Notifications";
import Container from "../Common/Container";

//Urql
import { useMutation } from "urql";
import { FORGET_PASSWORD } from "@/Urql/Query/Account/auth.query";
import { ForgetPasswordData } from "@/Urql/Types/Account/auth.types";

//Interface
interface Inputs {
    phone: string;
}

const ForgetForm = () => {
    //Initialize Hook
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ error, fetching }, mutate] = useMutation<ForgetPasswordData>(FORGET_PASSWORD);

    //Initialize Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();

    //Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ forgetPasswordInput: { phone: "88" + value.phone } }).then(({ error, data }) => {
            if (error) {
                setNotification(true)
            }
            if (data?.forgetPassword.success) {
                router.push(`/account/password/reset?token=${nextBase64.encode(value.phone)}`)
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
                    <h4 className="text-lg font-semibold uppercase mb-4">Forgot Password?</h4>
                    <p>Enter your email address to recover your password.</p>
                    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <Input
                                crossOrigin="anonymous"
                                label="Phone"
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
                        </div>
                        <div className="mt-6">
                            <button className="bg-main w-full uppercase font-semibold py-3 text-white rounded-md text-sm relative" type="submit" disabled={fetching}>
                                Send Reset Code
                                <div className="absolute top-1/2 -translate-y-1/2 right-5">
                                    {fetching &&
                                        <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                    }
                                </div>
                            </button>
                        </div>
                        <div className="text-right mt-2">
                            <Link href="account/old-login" className="text-sm opacity-60">
                                Back to Login?
                            </Link>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default ForgetForm;