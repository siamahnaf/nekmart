import { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

//Components
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";
import { GetProfileData } from "@/Urql/Types/Account/profile.types";
import { PAY_AGAIN } from "@/Urql/Query/Order/order.query";
import { PayAgainData } from "@/Urql/Types/Order/order.types";

const Cancel = () => {
    //Initialize router
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data: profile }] = useQuery<GetProfileData>({ query: GET_PROFILE });
    const [{ data, fetching, error }, mutate] = useMutation<PayAgainData>(PAY_AGAIN);

    //Handler on Pay again
    const onPay = () => {
        if (!profile) {
            router.push("/account/login");
        } else {
            mutate({ orderId: `NEK-${router.query.id}` }).then(({ error, data }) => {
                if (error) {
                    setNotification(true)
                }
                if (data?.payAgain.success) {
                    router.push(data.payAgain.redirectUri)
                }
            }).catch(() => {
                setNotification(true)
            })
        }
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div className="w-[60%] mx-auto border border-solid border-gray-300 rounded-md py-6 px-6">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity="error"
            >
                {error?.message}
            </Notification>
            <div className="text-center">
                <Icon icon="bxs:error" className="mx-auto text-6xl text-red-600" />
                <h3 className="text-3xl mt-2 font-semibold">Payment Failed!</h3>
                <h4 className="text-xl font-semibold opacity-90 mt-3">Order ID: <span className="text-main">NEK-{router.query.id}</span></h4>
                <p className="text-sm italic opacity-80 mt-2 mb-5">A copy of your order summary has been sent to your phone</p>
                <button className="text-white bg-main py-2.5 px-5 rounded-md text-sm uppercase font-semibold relative" disabled={fetching} onClick={onPay}>
                    <span className={`${fetching ? "opacity-30" : ""}`}>Pay Again</span>
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        {fetching &&
                            <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                        }
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Cancel;