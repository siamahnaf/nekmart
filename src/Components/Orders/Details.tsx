import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

//Components
import Timeline from "../Common/Timeline";
import Invoice from "./Invoice";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_ORDER } from "@/Urql/Query/Order/order.query";
import { GetSingleOrder } from "@/Urql/Types/Order/order.types";

const Details = () => {
    //Initialize Hook
    const router = useRouter();
    const componentRef = useRef(null);

    //State
    const [loading, setLoading] = useState<boolean>(false);

    //Urql
    const [{ data }] = useQuery<GetSingleOrder>({ query: GET_SINGLE_ORDER, variables: { orderSellerId: router.query.id } });

    //Print PDF
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => setLoading(true),
        onBeforePrint: () => setLoading(false),
        documentTitle: data?.getSingleOrderBySeller.order?.orderId || "nekmart",
        pageStyle: "padding: 72px"
    });

    if (!data) return null;

    return (
        <div>
            <h4 className="text-lg font-bold mb-5">Order Details</h4>
            <div className="border border-solid border-gray-200 rounded-md">
                <div className="flex gap-5 px-3 py-3 border-b border-solid border-gray-200">
                    <h4 className="flex-1 font-bold text-lg text-main">{data.getSingleOrderBySeller.order?.orderId}</h4>
                    <button onClick={handlePrint} className="bg-main py-1.5 px-2 text-sm text-white rounded-md font-medium relative" disabled={loading}>
                        <span className={`${loading ? "opacity-40" : ""}`}>Print this out!</span>
                        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                            {loading &&
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </button>
                </div>
                <div className="p-5">
                    <div className="w-[70%] mx-auto my-14">
                        <Timeline
                            current={data.getSingleOrderBySeller.status}
                        />
                    </div>
                    <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-5">Products</h4>
                        <div className="border border-solid border-gray-300 px-5 pb-5 rounded-md">
                            {data.getSingleOrderBySeller.products.map((item, i) => (
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
                                        <p className="font-bold">Est. {item.productId?.estimateDelivery || data.getSingleOrderBySeller.order?.estimateDelivery} day(s)</p>
                                    </div>
                                    <hr className="border-gray-300" />
                                </Fragment>
                            ))}
                            <div className="mt-5 text-center">
                                <p className="font-semibold">Please provide all details from your products!</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-5">Order Summery</h4>
                        <div className="flex gap-5 text-[15px] mb-2">
                            <span className="flex-1 font-semibold">Items</span>
                            <span>৳{data.getSingleOrderBySeller.price}</span>
                        </div>
                        <div className="flex gap-5 text-[15px] mb-2">
                            <span className="flex-1 font-semibold">Tax</span>
                            <span>৳{data.getSingleOrderBySeller.products.reduce((a, b) => a + b.tax, 0)}</span>
                        </div>
                        <hr className="border-gray-300" />
                        <div className="flex gap-5 text-[15px] mt-2">
                            <span className="flex-1 font-semibold">Subtotal</span>
                            <span className="text-main font-bold">৳{data.getSingleOrderBySeller.price + data.getSingleOrderBySeller.products.reduce((a, b) => a + b.tax, 0)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden">
                <div ref={componentRef}>
                    <Invoice />
                </div>
            </div>
        </div>
    );
};

export default Details;