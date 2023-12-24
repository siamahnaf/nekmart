import { Fragment, useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

//Components
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation } from "urql";
import { GOOGLE_LOGIN } from "@/Urql/Query/Account/auth.query";
import { GoogleLoginData } from "@/Urql/Types/Account/auth.types";

const GoogleLogin = () => {
    return (
        <Fragment>
            <GoogleOAuthProvider clientId="342777733000-ceu60md3s942jl51a41pemje6s9jcfav.apps.googleusercontent.com">
                <LoginButton />
            </GoogleOAuthProvider>
        </Fragment>
    );
};

export default GoogleLogin;


const LoginButton = () => {
    //Initializing Hook
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ error, fetching }, mutate] = useMutation<GoogleLoginData>(GOOGLE_LOGIN);

    //Tap tap login
    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            mutate({ googleInput: { code: "", idToken: credentialResponse.credential } }).then(({ error, data }) => {
                if (error) {
                    setNotification(true)
                }
                if (data?.googleInput.success) {
                    router.push("/")
                }
            }).catch(() => {
                setNotification(true)
            })
        },
        onError: () => {
            setNotification(true)
        },
    });

    //Login Handler
    const login = useGoogleLogin({
        onSuccess: codeResponse => {
            mutate({ googleInput: { code: codeResponse.code, idToken: "" } }).then(({ error, data }) => {
                if (error) {
                    setNotification(true)
                }
                if (data?.googleInput.success) {
                    router.push("/")
                }
            }).catch(() => {
                setNotification(true)
            })
        },
        onError: () => {
            setNotification(true)
        },
        flow: "auth-code"
    });

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity="error"
            >
                {error?.message || "Login with google was failed!"}
            </Notification>
            <button onClick={() => login()} disabled={fetching} className="w-full border border-solid border-[#0062cc] py-2 flex justify-center items-center gap-4 rounded-md text-[#0062cc] mt-4 relative">
                <Icon className="googleIcon" icon="flat-color-icons:google" />
                <span>Login with Google</span>
                <div className="absolute top-1/2 -translate-y-1/2 right-5">
                    {fetching &&
                        <div className="w-5 h-5 border-b-2 border-main rounded-full animate-spin ml-auto"></div>
                    }
                </div>
            </button>
        </div>
    )
}