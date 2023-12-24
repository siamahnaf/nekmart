import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

//Components
import Timeline from "@/Components/Common/Timeline";
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_SINGLE_ORDER, CANCEL_ORDER } from "@/Urql/Query/Order/order.query";
import { GetSingleOrder, CancelOrderData } from "@/Urql/Types/Order/order.types";

const Detail = () => {
    //Initialize Hook
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, error }, refetch] = useQuery<GetSingleOrder>({ query: GET_SINGLE_ORDER, variables: { getSingleOrderByUserId: router.query.id } });
    const [{ data: cancel, error: cancelError, fetching }, mutate] = useMutation<CancelOrderData>(CANCEL_ORDER);

    //Get Total tax
    const totalTax = data?.getSingleOrderByUser?.sellers.reduce((acc, seller) => {
        const sellerTotalTax = seller.products.reduce((sellerAcc, product) => {
            return sellerAcc + product.tax;
        }, 0);
        return acc + sellerTotalTax;
    }, 0);

    //Handler
    const onCancel = (id: string) => {
        mutate({ orderSellerId: id }).then(({ data }) => {
            setNotification(true)
            if (data?.cancelOrderStatusByUser.success) {
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification(true)
        })
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    if (error) return (
        <p className="text-center mt-1 text-main font-semibold">{error.message}</p>
    )

    if (!data) return null;

    return (
        <div>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={cancelError?.message ? "error" : "success"}
            >
                {cancelError?.message ?? cancel?.cancelOrderStatusByUser.message}
            </Notification>
            <h4 className="text-lg font-semibold mb-6">Order Details</h4>
            <div className="py-3 px-4 flex gap-5 border border-solid border-gray-300 items-center rounded mb-6">
                <div className="flex-1">
                    <h4><span>Order ID: </span> <span className="text-main font-semibold">{data.getSingleOrderByUser.orderId}</span></h4>
                    <p className="text-sm">Placed on {moment(data.getSingleOrderByUser.created_at).format("DD MMM YYYY, h:mm A")}</p>
                </div>
                <p className="text-lg font-semibold text-main">
                    ৳{data.getSingleOrderByUser.subtotal}
                </p>
            </div>
            {data.getSingleOrderByUser.sellers.map((item, i) => (
                <div className="border border-solid border-gray-300 rounded-md mb-6" key={i}>
                    <div className="px-3 py-2 border-b border-solid border-gray-300 flex gap-2">
                        <div className="flex-1">
                            <h4 className="flex items-center gap-2">
                                <Icon className="text-xl" icon="mdi:package-outline" />
                                <span className="text-lg font-semibold"> Package 1</span>
                            </h4>
                            <p className="text-sm">Sold by <span className="text-main font-semibold">{item.sellerId?.shopName}</span></p>
                        </div>
                        <button onClick={() => onCancel(item.id)} className="text-main font-semibold uppercase text-sm">
                            Cancel
                        </button>
                    </div>
                    <div className="p-5">
                        <div className="w-[70%] mx-auto my-14">
                            <Timeline
                                current={item.status}
                            />
                        </div>
                        <div className="mt-8">
                            <h4 className="text-lg font-semibold mb-5">Products</h4>
                            <div className="border border-solid border-gray-300 px-5 pb-5 rounded-md">
                                {item.products.map((item, i) => (
                                    <Fragment key={i}>
                                        <div className="flex gap-5 my-5 items-center">
                                            <Image
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL as string + item.productId?.images[0] as string}
                                                alt={item.productId?.name as string}
                                                width={300}
                                                height={300}
                                                className="w-[50px] rounded-md"
                                            />
                                            <div className="flex-1">
                                                <p className=" line-clamp-1">
                                                    {item.productId?.name}
                                                </p>
                                                <p className="text-sm flex gap-4">
                                                    {item.variation.map((v, vi) => (
                                                        <span key={vi}><span>{v.name}</span>: <span>{v.variant}</span></span>
                                                    ))}
                                                </p>
                                            </div>
                                            <p className="font-semibold">×{item.quantity}</p>
                                            <p className="font-bold">৳{item.amount}</p>
                                        </div>
                                        <hr className="border-gray-300" />
                                    </Fragment>
                                ))}
                                <div className="mt-5 text-center">
                                    <p>To track the delivery of your order, go to My <Link href="/track-your-order" className="text-main font-bold">Track Order</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="border border-solid border-gray-200 rounded-md mb-8">
                <h4 className="text-lg font-semibold px-3 py-3 border-b border-solid border-gray-200">Total Summery</h4>
                <div className="p-5">
                    <div className="flex gap-5 text-[15px] mb-2">
                        <span className="flex-1 font-semibold">Total</span>
                        <span>৳{data.getSingleOrderByUser.total}</span>
                    </div>
                    <div className="flex gap-5 text-[15px] mb-2">
                        <span className="flex-1 font-semibold">Tax</span>
                        <span>৳{totalTax}</span>
                    </div>
                    <div className="flex gap-5 text-[15px] mb-2">
                        <span className="flex-1 font-semibold">Shipping Fees</span>
                        <span>৳{Number(data.getSingleOrderByUser.shippingFees) * Number(data.getSingleOrderByUser.shippingCount)}</span>
                    </div>
                    <div className="flex gap-5 text-[15px] mb-2">
                        <span className="flex-1 font-semibold">Coupon Discount</span>
                        <span>৳{data.getSingleOrderByUser.couponDiscount}</span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex gap-5 text-[15px] mt-2">
                        <span className="flex-1 font-semibold">Subtotal</span>
                        <span className="text-main font-bold">৳{data.getSingleOrderByUser.subtotal}</span>
                    </div>
                </div>
            </div>
            <div className="border border-solid border-gray-200 rounded-md mb-8">
                <h4 className="text-lg font-semibold px-3 py-3 border-b border-solid border-gray-200">Addresses</h4>
                <div className="p-5 grid grid-cols-2 gap-10">
                    <div>
                        <h4 className="text-base font-semibold mb-2">Shipping Address</h4>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Name: </span>
                            {data.getSingleOrderByUser.shippingAddress?.name}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Phone: </span>
                            {data.getSingleOrderByUser.shippingAddress?.phone}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Address: </span>
                            {data.getSingleOrderByUser.shippingAddress?.address}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">City: </span>
                            {data.getSingleOrderByUser.shippingAddress?.city}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Area: </span>
                            {data.getSingleOrderByUser.shippingAddress?.area}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-base font-semibold mb-2">Billing Address</h4>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Name: </span>
                            {data.getSingleOrderByUser.billingAddress?.name}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Phone: </span>
                            {data.getSingleOrderByUser.billingAddress?.phone}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Address: </span>
                            {data.getSingleOrderByUser.billingAddress?.address}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">City: </span>
                            {data.getSingleOrderByUser.billingAddress?.city}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Area: </span>
                            {data.getSingleOrderByUser.billingAddress?.area}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;