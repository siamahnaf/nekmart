import { ChangeEvent, useState } from "react";
import { Input, Checkbox } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import nextBase64 from "next-base64";
import moment from "moment";

//Components
import { Notification } from "../Common/Notifications";
import Container from "../Common/Container";
import FacebookLogin from "./LoginForm/FacebookLogin";
import GoogleLogin from "./LoginForm/GoogleLogin";

//Urql
import { useMutation } from "urql";
import { REGISTRATION } from "@/Urql/Query/Account/auth.query";
import { RegistrationData } from "@/Urql/Types/Account/auth.types";

//Interface
interface Inputs {
    name: string;
    phone: string;
    email: string;
    password: string;
    agree: boolean;
}

const RegForm = () => {
    //Initialize Hook
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ error, fetching }, mutate] = useMutation<RegistrationData>(REGISTRATION);

    //Initialize Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();

    //SubmitHandler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const formData = {
            name: value.name,
            phone: "88" + value.phone,
            email: value.email,
            password: value.password
        }
        mutate({ signupInput: formData }).then(({ error, data }) => {
            if (error) {
                setNotification(true)
            }
            if (data?.signup.success) {
                router.push(`/account/verification?token=${nextBase64.encode(value.phone)}&expires=${moment().add(5, 'minutes').unix()}`)
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
                    <h4 className="text-lg font-semibold uppercase mb-4">Create an account.</h4>
                    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <Input
                                crossOrigin="anonymous"
                                label="Name"
                                color="red"
                                {...register("name", { required: true })}
                                error={errors.name ? true : false}
                            />
                        </div>
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
                        <div className="mb-5">
                            <Input
                                crossOrigin="anonymous"
                                label="Email"
                                color="red"
                                {...register("email", { required: true })}
                                error={errors.email ? true : false}
                            />
                        </div>
                        <div className="mb-3">
                            <Input
                                crossOrigin="anonymous"
                                label="Password"
                                color="red"
                                type="password"
                                {...register("password", { required: true })}
                                error={errors.password ? true : false}
                            />
                        </div>
                        <div className="text-left">
                            <Checkbox
                                label="By signing up you agree to our terms and conditions."
                                crossOrigin="anonymous"
                                color="red"
                                className="w-4 h-4 rounded border-black border-opacity-25"
                                {...register("agree", { required: true })}
                                labelProps={{
                                    className: `${errors.agree ? "!text-main" : ""}`
                                }}
                                required
                            />
                        </div>
                        <div className="mt-6">
                            <button className="bg-main w-full uppercase font-semibold py-3 text-white rounded-md text-sm relative" type="submit" disabled={fetching}>
                                Create Account
                                <div className="absolute top-1/2 -translate-y-1/2 right-5">
                                    {fetching &&
                                        <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                    }
                                </div>
                            </button>
                        </div>
                        <div className="mt-8">
                            <FacebookLogin />
                            <GoogleLogin />
                        </div>
                        <div className="mt-5">
                            <p>Already have an account? <Link href="/account/login" className="text-main">Login</Link></p>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default RegForm;