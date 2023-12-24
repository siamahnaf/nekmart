import { useState } from "react";
import { useRouter } from "next/router";

//Components
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";
import { ADD_CART, GET_CART } from "@/Urql/Query/Cart/cart.query";
import { GetProfileData } from "@/Urql/Types/Account/profile.types";
import { AddCartData } from "@/Urql/Types/Cart/cart.types";

//interface
interface Props {
    sellerId: string;
    reserved: number;
    attributes: { id: string, name: string, variant: string }[];
    minPurchase: string;
    onError: () => void;
    hasAttributes: boolean;
    attributeLength: number;
}

const BuyButton = ({ sellerId, reserved, attributes, minPurchase, onError, hasAttributes, attributeLength }: Props) => {
    //Initializing Hooks
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data: profile }] = useQuery<GetProfileData>({ query: GET_PROFILE });
    const [_, refetch] = useQuery({ query: GET_CART });
    const [{ data, error, fetching }, mutate] = useMutation<AddCartData>(ADD_CART);

    //On Wishlist Handler
    const onBuyHandler = () => {
        if (!profile) {
            router.push("/account/login")
        } else {
            if (attributes.length < attributeLength && hasAttributes) {
                onError();
            } else {
                const formData = {
                    productId: id,
                    seller: sellerId,
                    reserved: reserved,
                    attributes
                }
                mutate({ cartInput: formData }).then(({ data, error }) => {
                    if (error?.message === "Product exist to cart!") {
                        router.push("/checkout")
                    }
                    if (data?.addCart.message) {
                        refetch({ requestPolicy: "network-only" })
                        router.push("/checkout")
                    }
                }).catch(() => {
                    setNotification(true)
                })
            }
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
                severity="error"
            >
                {error?.message}
            </Notification>
            <button className={`w-full py-2 bg-main text-sm font-semibold text-white rounded-lg ${reserved < Number(minPurchase) ? "opacity-60" : ""}`} disabled={reserved < Number(minPurchase)} onClick={onBuyHandler}>
                Buy Now
                <div className="absolute top-1/2 right-5 -translate-y-1/2">
                    {fetching &&
                        <div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin"></div>
                    }
                </div>
            </button>
        </div>
    );
};

export default BuyButton;