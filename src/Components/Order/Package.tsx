import { Fragment, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

//Components
import Timeline from "../Common/Timeline";
import Invoice from "./Invoice";
import OrderStatus from "./OrderStatus";

//Urql
import { OrderSeller } from "@/Urql/Types/Order/order.types";

//Interface
interface Props {
    item: OrderSeller;
    totalTax: number;
    shippingFees: number;
    couponDiscount: number;
    packageLength: number;
}

const Package = ({ item, totalTax, shippingFees, couponDiscount, packageLength }: Props) => {
    //Initialize Hook
    const componentRef = useRef(null);

    //State
    const [loading, setLoading] = useState<boolean>(false);

    //Print PDF
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onBeforeGetContent: () => setLoading(true),
        onBeforePrint: () => setLoading(false),
        documentTitle: "nekmart",
        pageStyle: "padding: 72px"
    });

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-8">
            <div className="flex gap-5 px-3 py-3 border-b border-solid border-gray-200">
                <h4 className="flex-1 font-bold text-lg text-main flex gap-2 items-center">
                    <Icon icon="mdi:package-outline" />
                    <span> by {item.sellerId?.shopName}</span>
                </h4>
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
                        current={item.status}
                    />
                </div>

                <OrderStatus id={item.id} />

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
                            <p className="font-semibold">Please provide all details from your products!</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h4 className="text-lg font-semibold mb-5">Package Summery</h4>
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
                        <span>৳{shippingFees}</span>
                    </div>
                    <div className="flex gap-5 text-[15px] mb-2">
                        <span className="flex-1 font-semibold">Coupon Discount</span>
                        <span>৳{couponDiscount / packageLength}</span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex gap-5 text-[15px] mt-2">
                        <span className="flex-1 font-semibold">Subtotal</span>
                        <span className="text-main font-bold">৳{item.price + totalTax + shippingFees + (couponDiscount / packageLength)}</span>
                    </div>
                </div>
            </div>
            <div className="hidden">
                <div ref={componentRef}>
                    <Invoice
                        item={item}
                        totalTax={totalTax}
                    />
                </div>
            </div>
        </div>
    );
};

export default Package;