import { Fragment } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

//Urql
import { useQuery } from "urql";
import { GET_ORDER } from "@/Urql/Query/Order/order.query";
import { GetOrderData } from "@/Urql/Types/Order/order.types";

const Success = () => {
    //Initialize Hook
    const router = useRouter();

    //Urql
    const [{ data, error }] = useQuery<GetOrderData>({ query: GET_ORDER, variables: { trackInput: { trackId: `NEK-${router.query.id}` } } });

    if (error) return (
        <p className="text-center mt-5 text-main font-medium">{error?.message}</p>
    )

    if (!data) return null;

    return (
        <div className="w-[60%] mx-auto border border-solid border-gray-300 rounded-md py-6 px-6">
            <div className="text-center">
                <Icon icon="la:check-circle-solid" className="mx-auto text-5xl text-green-600" />
                <h3 className="text-3xl mt-2 font-semibold">Thank You for Your Order!</h3>
                <h4 className="text-xl font-semibold opacity-90 mt-3">Order ID: <span className="text-main">{data?.trackOrder.orderId}</span></h4>
                <p className="text-sm italic opacity-80 mt-2 mb-5">A copy of your order summary has been sent to your phone</p>
                <Link href={`/dashboard/purchase-history/${data?.trackOrder.id}`} className="bg-main text-white rounded-md py-2.5 px-5 text-sm uppercase font-medium">
                    See Details
                </Link>
            </div>
            <div className="mt-8">
                <h4 className="text-lg font-semibold mb-5">Products</h4>
                <div className="border border-solid border-gray-300 px-5 pb-5 rounded-md">
                    {data.trackOrder.sellers.map((seller, i) => (
                        <Fragment key={i}>
                            {seller.products.map((item, si) => (
                                <Fragment key={si}>
                                    <div className="flex gap-5 my-5 items-center">
                                        <Image
                                            src={process.env.NEXT_PUBLIC_IMAGE_URL as string + item.productId?.images[0] as string}
                                            alt={item.productId?.name as string}
                                            width={300}
                                            height={300}
                                            className="w-[50px] rounded-md"
                                        />
                                        <p className="flex-1 line-clamp-1">{item.productId?.name}</p>
                                        <p className="font-bold">Est. {item.productId?.estimateDelivery || data.trackOrder.estimateDelivery} day(s)</p>
                                    </div>
                                    <hr className="border-gray-300" />
                                </Fragment>
                            ))}
                        </Fragment>
                    ))}
                    <div className="mt-5 text-center">
                        <p>To track the delivery of your order, go to My <Link href="/track-your-order" className="text-main font-bold">Track Order</Link></p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h4 className="text-lg font-semibold mb-5">Order Summery</h4>
                <div className="flex gap-5 text-[15px] mb-2">
                    <span className="flex-1 font-semibold">Total</span>
                    <span>৳{data.trackOrder.total}</span>
                </div>
                <div className="flex gap-5 text-[15px] mb-3">
                    <span className="flex-1 font-semibold">Shipping Fees</span>
                    <span>৳{data.trackOrder.shippingFees * data.trackOrder.shippingCount}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex gap-5 text-[15px] mt-2">
                    <span className="flex-1 font-semibold">Subtotal</span>
                    <span className="text-main font-bold">৳{data.trackOrder.subtotal}</span>
                </div>
            </div>
        </div>
    );
};

export default Success;