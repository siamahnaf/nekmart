import { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import moment from "moment";
import QRCode from "react-qr-code";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_ORDER } from "@/Urql/Query/Order/order.query";
import { GetSingleOrder, OrderSeller } from "@/Urql/Types/Order/order.types";

//Interface
interface Props {
    item: OrderSeller;
    totalTax: number;
}

const Invoice = ({ item, totalTax }: Props) => {
    //Initialize Hook
    const router = useRouter();

    //Urql
    const [{ data }] = useQuery<GetSingleOrder>({ query: GET_SINGLE_ORDER, variables: { getOrderId: router.query.id } });

    return (
        <div className="">
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <Image src="/images/logo.png" alt="logo" width={270} height={60} />
                    <h4 className="mt-2.5 mb-px"><strong>Address:</strong> ShikderTower (2nd Floor). B-116/1 Shobanbag, Savar, Dhaka-1340</h4>
                    <h4 className="mb-px"><strong>Email:</strong> nekmartbd@gmail.com</h4>
                    <h4><strong>Phone:</strong> +8801683838384</h4>
                </div>
                <div className="text-right mt-4">
                    <QRCode value={data?.getOrder?.orderId as string} size={80} className="ml-auto" />
                    <h4 className="text-lg font-semibold">Invoice</h4>
                    <h6><strong>Order ID:</strong> <span className="text-main font-semibold">{data?.getOrder.orderId}</span></h6>
                    <h6><strong>Date:</strong> {moment(data?.getOrder.created_at).format("DD MMM YYYY")}</h6>
                </div>
            </div>
            <hr className="border-gray-400 mt-6" />
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
                                <p className="font-bold">Est. {item.productId?.estimateDelivery || data?.getOrder.estimateDelivery} day(s)</p>
                            </div>
                            <hr className="border-gray-300" />
                        </Fragment>
                    ))}
                    <div className="mt-5 text-center">
                        <p className="font-semibold">Please attach this pdf into your products!</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h4 className="text-lg font-semibold mb-5">Order Summery</h4>
                <div className="flex gap-5 text-[15px] mb-2">
                    <span className="flex-1 font-semibold">Items Price</span>
                    <span>৳{item.price}</span>
                </div>
                <div className="flex gap-5 text-[15px] mb-2">
                    <span className="flex-1 font-semibold">Tax</span>
                    <span>৳{totalTax}</span>
                </div>
                <div className="flex gap-5 text-[15px] mb-2">
                    <span className="flex-1 font-semibold">Shipping Fees</span>
                    <span>৳{data?.getOrder.shippingFees}</span>
                </div>
                <div className="flex gap-5 text-[15px] mb-2">
                    <span className="flex-1 font-semibold">Coupon Discount</span>
                    <span>৳{Number(data?.getOrder.couponDiscount) / Number(data?.getOrder.sellers?.length)}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex gap-5 text-[15px] mt-2">
                    <span className="flex-1 font-semibold">Subtotal</span>
                    <span className="text-main font-bold">৳{item.price + totalTax + Number(data?.getOrder.shippingFees) + (Number(data?.getOrder.couponDiscount) / Number(data?.getOrder.sellers?.length))}</span>
                </div>
            </div>
            <div className="text-center mt-32 text-sm">
                <h4>This is system generated invoice!</h4>
            </div>
        </div>
    );
};

export default Invoice;