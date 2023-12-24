import { ChangeEvent, useState } from "react";
import { Input } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

//Components
import { Notification } from "../Common/Notifications";
import Container from "../Common/Container";

//Urql
import { useMutation } from "urql";
import { PASSWORD_LOGIN } from "@/Urql/Query/Account/auth.query";
import { PasswordLoginData } from "@/Urql/Types/Account/auth.types";

//Interface
interface Inputs {
    phoneOrEmail: string;
    password: string;
}

const OldForm = () => {
    //Initialize Hook
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ error, fetching }, mutate] = useMutation<PasswordLoginData>(PASSWORD_LOGIN);

    //Initialize Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();

    //SubmitHandler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ loginInput: { phoneOrEmail: "88" + value.phoneOrEmail, password: value.password } }).then(({ error, data }) => {
            if (error) {
                setNotification(true)
            }
            if (data?.login.success) {
                router.push("/")
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
                    <h4 className="text-lg font-semibold uppercase mb-4">Login to your account.</h4>
                    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <Input
                                crossOrigin="anonymous"
                                label="Phone"
                                color="red"
                                {...register("phoneOrEmail", {
                                    required: true,
                                    pattern: /^0\d{10}$/
                                })}
                                error={errors.phoneOrEmail ? true : false}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
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
                        <div className="text-right">
                            <Link href="/account/password/forget" className="text-sm opacity-60">
                                Forget password?
                            </Link>
                        </div>
                        <div className="mt-6">
                            <button className="bg-main w-full uppercase font-semibold py-3 text-white rounded-md text-sm relative" type="submit" disabled={fetching}>
                                Login with password
                                <div className="absolute top-1/2 -translate-y-1/2 right-5">
                                    {fetching &&
                                        <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                    }
                                </div>
                            </button>
                        </div>
                        <div className="mt-5">
                            <p>No account? <Link href="/account/register" className="text-main">Register</Link></p>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default OldForm;