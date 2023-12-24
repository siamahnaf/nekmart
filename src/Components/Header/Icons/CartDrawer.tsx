import { Fragment, useState } from "react";
import { Drawer } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import slugify from "slugify";
import Image from "next/image";

//Components
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useQuery, useMutation } from "urql";
import { GET_CART, DELETE_CART, INCREASE_CART, DECREASE_CART } from "@/Urql/Query/Cart/cart.query";
import { GetCartData, CartData, DeleteCartData, IncreaseCartData, DecreaseCartData } from "@/Urql/Types/Cart/cart.types";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
}

const CartDrawer = ({ open, onClose }: Props) => {
    //State
    const [notification, setNotification] = useState<boolean>(false);


    //Urql
    const [{ data }, refetch] = useQuery<GetCartData>({ query: GET_CART });
    const [{ data: deleteData, error }, mutate] = useMutation<DeleteCartData>(DELETE_CART);
    const [_, increaseMutate] = useMutation<IncreaseCartData>(INCREASE_CART);
    const [__, decreaseMutate] = useMutation<DecreaseCartData>(DECREASE_CART);

    //Handler
    const onDeleteHandler = (id: string) => {
        mutate({ deleteCartId: id }).then(({ data }) => {
            setNotification(true)
            if (data?.deleteCart.message) {
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification(true)
        })
    };

    //Handler increase
    const increaseHandler = (id: string) => {
        increaseMutate({ increaseCartId: id }).then(({ data }) => {
            if (data?.increaseCart.message) {
                refetch({ requestPolicy: "network-only" })
            }
        })
    };

    //Handler decrease
    const decreaseHandler = (id: string) => {
        decreaseMutate({ decreaseCartId: id }).then(({ data }) => {
            if (data?.decreaseCart.message) {
                refetch({ requestPolicy: "network-only" })
            }
        })
    };

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //Null Return
    if (!data) return null;

    //Get Calculated Price
    const getCalculatedPrice = (item: CartData) => {
        if (item.attributes) {
            const variantName = item.attributes.map(n => n.variant).join("-");
            const normalizeString = (str: string) => str?.split('').sort().join('');
            const normalizedVariant = normalizeString(variantName);
            const attributes = item.productId?.attributes?.attributes.find(a => {
                const normalizedAttribute = normalizeString(a.variant as string);
                return normalizedAttribute === normalizedVariant;
            });
            if (attributes) {
                let totalPrice;
                if (item.productId.discountUnit === "percent") {
                    totalPrice = Math.round(Number(attributes.price) - (Number(attributes.price) * (Number(item.productId.discount) / 100)));
                } else if (item.productId.discountUnit === "flat") {
                    totalPrice = Math.round(Number(attributes.price) - Number(item.productId.discount));
                }
                return {
                    image: attributes.image,
                    price: totalPrice,
                    quantity: attributes.quantity
                }
            }
            return {
                image: item.productId.images[0],
                price: item.productId.totalPrice,
                quantity: item.productId.quantity
            }
        } else {
            return {
                image: item.productId.images[0],
                price: item.productId.totalPrice,
                quantity: item.productId.quantity
            }
        }
    }

    return (
        <Fragment>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? deleteData?.deleteCart.message}
            </Notification>
            <Drawer
                open={open}
                onClose={onClose}
                className="p-4"
                placement="right"
                overlayProps={{ className: "z-50 fixed top-0 left-0 w-full h-full" }}
                size={410}
            >
                <div className="grid grid-cols-2 items-center">
                    <p className="flex gap-2 items-center">
                        <Icon icon="cil:cart" />
                        <span>{data?.getCarts.length || 0} Item(s)</span>
                    </p>
                    <div className="text-right">
                        <button className="bg-main p-1.5 bg-opacity-10 rounded text-main" onClick={onClose}>
                            <Icon icon="akar-icons:cross" />
                        </button>
                    </div>
                </div>
                <hr className="mt-4 mb-4" />
                {data.getCarts.length === 0 &&
                    <p className="text-center text-main mt-10 font-medium">Your shopping bag is empty. Start shopping</p>
                }
                <div>
                    {data.getCarts.map((item, i) => (
                        <div className={`flex gap-4 my-2 items-center ${data.getCarts.length - 1 !== i ? "border-b border-solid border-gray-300 mb-4 pb-4" : ""}`} key={i}>
                            <div className="text-center bg-main text-white px-2 py-2 rounded-3xl">
                                <span className={`mb-1 block cursor-pointer select-none ${item.reserved >= Number(getCalculatedPrice(item)?.quantity) ? "opacity-50 pointer-events-none" : ""}`} onClick={() => increaseHandler(item.id)}>
                                    <Icon icon="akar-icons:plus" />
                                </span>
                                <span>{item.reserved}</span>
                                <span className={`mt-0.5 block cursor-pointer select-none ${Number(item.productId.minPurchase) >= item.reserved ? "opacity-50 pointer-events-none" : ""}`} onClick={() => decreaseHandler(item.id)}>
                                    <Icon icon="akar-icons:minus" />
                                </span>
                            </div>
                            <div className="flex-1 flex gap-3">
                                <div className="flex-[0_0_17%]">
                                    <Image
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL as string + getCalculatedPrice(item).image as string}
                                        alt={item.productId.name}
                                        width={100}
                                        height={100}
                                        className="w-full rounded-md"
                                    />
                                </div>
                                <div>
                                    <Link href={`/product/${slugify(item.productId.name, { lower: true })}-${item.id}`} className="text-main line-clamp-1 text-[15px] font-medium mb-1">
                                        {item.productId.name}
                                    </Link>
                                    <p className="text-sm">৳{getCalculatedPrice(item).price} x {item.reserved}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <button className="border border-solid border-gray-500 p-2 rounded-md hover:bg-main hover:text-white hover:border-main" onClick={() => onDeleteHandler(item.id)}>
                                    <Icon icon="material-symbols:delete-outline" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 p-2 w-full">
                    <Link href="/checkout" className="bg-main w-full block py-2 text-center rounded-md text-white font-medium">
                        Checkout (৳{data.getCarts.reduce((a, b) => +a + +((getCalculatedPrice(b)?.price || 0) as number * Number(b.reserved)), 0)})
                    </Link>
                </div>
            </Drawer>
        </Fragment>
    );
};

export default CartDrawer;