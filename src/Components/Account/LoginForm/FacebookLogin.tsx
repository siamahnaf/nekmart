import { useState } from "react";
import LoginButton from "@greatsumini/react-facebook-login";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

//Components
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation } from "urql";
import { FACEBOOK_LOGIN } from "@/Urql/Query/Account/auth.query";
import { FacebookLoginData } from "@/Urql/Types/Account/auth.types";

//Interface
interface FacebookOnResponse {
    accessToken: string;
    expiresIn: string;
    reauthorize_required_in: string;
    signedRequest: string;
    userID: string;
}

const FacebookLogin = () => {
    //Initializing Hook
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ error, fetching }, mutate] = useMutation<FacebookLoginData>(FACEBOOK_LOGIN);

    //Handler
    const onSuccess = (response: FacebookOnResponse | undefined) => {
        if (response) {
            mutate({ facebookInput: { userId: response.userID, accessToken: response.accessToken } }).then(({ error, data }) => {
                if (error) {
                    setNotification(true)
                }
                if (data?.facebookLogin.success) {
                    router.push("/")
                }
            }).catch(() => {
                setNotification(true)
            })
        }
    }

    //Handler
    const onError = () => {
        setNotification(true)
    }

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
                {error?.message || "Login with facebook was failed!"}
            </Notification>
            <LoginButton
                appId="265554609068125"
                onSuccess={onSuccess}
                onFail={onError}
                render={({ onClick }) => (
                    <button onClick={onClick} disabled={fetching} className="w-full bg-[#0062cc] py-2 flex justify-center items-center gap-4 rounded-md text-white relative">
                        <Icon className="facebookIcon" icon="bi:facebook" />
                        <span>Continue with Facebook</span>
                        <div className="absolute top-1/2 -translate-y-1/2 right-5">
                            {fetching &&
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </button>
                )}
            />
        </div>

    );
};

export default FacebookLogin;