import { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

//Components
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";
import { ADD_WISHLIST, CHECK_WISHLIST, GET_WISHLIST } from "@/Urql/Query/Wishlist/wishlist.query";
import { GetProfileData } from "@/Urql/Types/Account/profile.types";
import { AddWishlistData, CheckWishlistData } from "@/Urql/Types/Wishlist/wishlist.types";

const WishButton = () => {
    //Initializing Hooks
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data: profile }] = useQuery<GetProfileData>({ query: GET_PROFILE });
    const [{ data: check }, refetch] = useQuery<CheckWishlistData>({ query: CHECK_WISHLIST, variables: { productId: id } });
    const [_, listRefetch] = useQuery({ query: GET_WISHLIST });
    const [{ data, error, fetching }, mutate] = useMutation<AddWishlistData>(ADD_WISHLIST);

    //On Wishlist Handler
    const onWishlistHandler = () => {
        if (!profile) {
            router.push("/account/login")
        } else {
            mutate({ wishlistInput: { productId: id } }).then(({ data }) => {
                setNotification(true)
                if (data?.addWishlist.success) {
                    refetch({ requestPolicy: "network-only" })
                    listRefetch({ requestPolicy: "network-only" })
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
        <div className="relative">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.addWishlist.message}
            </Notification>
            <button className={`w-10 h-10 flex justify-center items-center text-white rounded ${check?.checkWishlist.status ? "bg-green-600" : "bg-main"}`} onClick={onWishlistHandler}>
                {fetching ?
                    <div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin"></div> : <Icon icon="codicon:heart" />
                }
            </button>
        </div>
    );
};

export default WishButton;