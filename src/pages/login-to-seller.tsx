import { useState } from "react";
import type { GetServerSideProps } from "next";
import { Input } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

//Component
import Container from "@/Components/Common/Container";
import { Notification } from "@/Components/Common/Notification";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { useMutation } from "urql";
import { SELLER_LOGIN, GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { SellerLoginData } from "@/Urql/Types/Authentication/auth.types";

//Interface
interface Inputs {
    phoneOrEmail: string;
    password: string;
}

const Login = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Initialize Hook
    const router = useRouter();

    //Urql
    const [{ error, fetching }, mutate] = useMutation<SellerLoginData>(SELLER_LOGIN);

    //Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const formData = {
            phoneOrEmail: value.phoneOrEmail.match(/^[0-9]+$/) != null ? `88${value.phoneOrEmail}` : value.phoneOrEmail,
            password: value.password
        }
        mutate({ loginInput: formData }).then(({ error, data }) => {
            if (error) {
                setNotification(true)
            }
            if (data?.loginSeller.success) {
                router.push("/")
            }
        }).catch(() => {
            setNotification(true)
        })
    };

    return (
        <Container className="!py-28">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity="error"
            >
                {error?.message}
            </Notification>
            <div className="w-[35%] mx-auto shadow-3xl border border-solid border-gray-300 rounded-lg p-8">
                <div className="text-center">
                    <Image src="/images/logo.png" alt="logo" width={270} height={60} className="mx-auto" />
                    <p className="text-base font-medium italic">Login to seller</p>
                </div>
                <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <Input
                            crossOrigin="anonymous"
                            label="Email or phone"
                            color="red"
                            size="lg"
                            {...register("phoneOrEmail", { required: true })}
                            error={errors.phoneOrEmail ? true : false}
                        />
                    </div>
                    <div>
                        <Input
                            crossOrigin="anonymous"
                            label="Password"
                            type="password"
                            color="red"
                            size="lg"
                            {...register("password", { required: true })}
                            error={errors.password ? true : false}
                        />
                    </div>
                    <div className="text-right text-gray-600 my-3">
                        <Link href="/password/reset">Forget Password?</Link>
                    </div>
                    <div className="mt-5">
                        <button className="bg-main w-full uppercase font-semibold py-3 text-white rounded-md text-sm relative" type="submit" disabled={fetching}>
                            Login
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
    );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    //Urql
    const { client, ssrCache } = initUrqlClient();

    //Headers
    const fetchOptions = {
        headers: {
            cookie: ctx.req.headers.cookie as string
        }
    };

    //Queries
    const { data } = await client.query(
        GET_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    if (data) {
        return { redirect: { destination: "/", permanent: false } }
    }

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}