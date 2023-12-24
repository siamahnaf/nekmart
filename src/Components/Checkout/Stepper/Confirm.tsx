import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/router";

//Components
import { Notification } from "@/Components/Common/Notifications";

//Context
import { checkoutContext } from "@/Context/checkout.context";

//Urql
import { useMutation, useQuery } from "urql";
import { ADD_ORDER } from "@/Urql/Query/Order/order.query";
import { GET_CART } from "@/Urql/Query/Cart/cart.query";
import { AddOrderData } from "@/Urql/Types/Order/order.types";

const Confirm = () => {
    //Initialize
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Context
    const { carts, address } = useContext(checkoutContext);

    //State
    const [selected, setSelected] = useState<"cash" | "ssl" | "">("");

    //Urql
    const [{ error, fetching }, mutate] = useMutation<AddOrderData>(ADD_ORDER);
    const [_, refetch] = useQuery({ query: GET_CART });

    //Handler
    const onPlace = () => {
        const formData = {
            ...carts,
            sellers: carts?.sellers.map(item => {
                return {
                    ...item,
                    products: item.products.map(product => {
                        const { name, ...rest } = product;
                        return {
                            ...rest,
                            variation: rest.variation.map(v => {
                                return {
                                    id: v.id,
                                    name: v.name,
                                    variant: v.variant
                                }
                            })
                        }
                    })
                }
            }),
            ...address,
            payment: {
                paymentMethod: selected === "cash" ? "cash" : "online"
            }
        }
        mutate({ orderInput: formData }).then(({ error, data }) => {
            if (error) {
                setNotification(true)
            }
            if (data?.addOrder.success) {
                window.location.href = data.addOrder.redirectUri;
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
        <div className="grid grid-cols-12 gap-10 items-start">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity="error"
            >
                {error?.message}
            </Notification>
            <div className="col-span-8 border border-solid border-gray-300">
                <h5 className="px-4 py-3 text-lg font-semibold">
                    Select A Payment Method
                </h5>
                <hr />
                <div className="px-4 py-5">
                    <h6 className="flex gap-2 items-center font-semibold opacity-60">
                        <Icon className="text-xl" icon="codicon:arrow-circle-right" />
                        <span>Online Pay (Bkash, Nagad, Card)</span>
                    </h6>
                    <div className={`border border-solid w-max rounded-md py-3 mt-3 cursor-pointer select-none p-3 ${selected === "ssl" ? "border-main" : "border-gray-400"}`} onClick={() => setSelected("ssl")}>
                        <Image src="/ssl.jpg" alt="Cod" width={170} height={145} />
                    </div>
                </div>
                <div className="px-4 py-5">
                    <h6 className="flex gap-2 items-center font-semibold opacity-60">
                        <Icon className="text-xl" icon="codicon:arrow-circle-right" />
                        <span>Cash Pay (Cash on Delivery)</span>
                    </h6>
                    <div className={`border border-solid w-max rounded-md py-3 mt-3 cursor-pointer select-none p-3 ${selected === "cash" ? "border-main" : "border-gray-400"}`} onClick={() => setSelected("cash")}>
                        <Image src="/cod.jpg" alt="Cod" width={170} height={145} />
                    </div>
                </div>
            </div>
            <div className="col-span-4">
                <h5 className="text-lg font-bold mb-4">Order Summery</h5>
                <div className="flex gap-5 text-lg">
                    <span className="flex-1 font-semibold">Subtotal</span>
                    <span className="text-main font-semibold">৳{carts?.subtotal}</span>
                </div>
                <div className="mt-5">
                    <button className={`bg-main py-2 text-center w-full rounded-md text-sm font-medium text-white relative ${!selected ? "opacity-50" : ""}`} disabled={!selected} onClick={onPlace}>
                        Place Order
                        <div className="absolute top-1/2 -translate-y-1/2 right-5">
                            {fetching &&
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;