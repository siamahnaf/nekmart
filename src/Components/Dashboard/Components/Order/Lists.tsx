import { Fragment } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

//Components
import ReviewChecker from "./ReviewChecker";

//Urql
import { useQuery } from "urql";
import { GET_MY_ORDER } from "@/Urql/Query/Order/order.query";
import { GetOrderByUser } from "@/Urql/Types/Order/order.types";

const Lists = () => {
    //Urql
    const [{ data }] = useQuery<GetOrderByUser>({ query: GET_MY_ORDER });

    if (!data) return null;

    return (
        <div>
            <h4 className="text-lg font-bold mb-6">My orders</h4>
            <div>
                {data.getOrderByUser.map((item, i) => (
                    <div className="border border-solid border-gray-300 mb-5 rounded" key={i}>
                        <div className="py-3 px-4 flex gap-5 border-b border-solid border-gray-300 items-center">
                            <div className="flex-1">
                                <h4><span>Order ID: </span> <span className="text-main font-semibold">{item.orderId}</span></h4>
                                <p className="text-sm">Placed on {moment(item.created_at).format("DD MMM YYYY, h:mm A")}</p>
                            </div>
                            <Link href={`/dashboard/purchase-history/${item.id}`} className="text-main uppercase text-sm font-medium">
                                Manage
                            </Link>
                        </div>
                        <div className="p-5 !pb-0">
                            {item.sellers.map((seller, si) => (
                                <Fragment key={si}>
                                    {seller.products.map((product, pi) => (
                                        <div key={pi} className="flex gap-7 mb-5 items-center">
                                            <Image
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL as string + product.productId?.images[0] as string}
                                                alt={product.productId?.name as string}
                                                width={300}
                                                height={300}
                                                className="w-[55px] rounded-md"
                                            />
                                            <p className="flex-1 line-clamp-1">{product.productId?.name}</p>
                                            <ReviewChecker
                                                id={product.productId?.id as string}
                                                status={seller.status}
                                                seller={seller.sellerId?.id as string}
                                            />
                                            <p className="font-bold">×{product.quantity}</p>
                                            <p className="font-bold">Est. {product.productId?.estimateDelivery || item.estimateDelivery} day(s)</p>
                                        </div>
                                    ))}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lists;