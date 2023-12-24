import { useState } from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import slugify from "slugify";

//Components
import Add from "./Add";

//Urql
import { useQuery } from "urql";
import { GET_REFUNDABLE_PRODUCTS } from "@/Urql/Query/Refund/refund.query";
import { GetRefundableProducts } from "@/Urql/Types/Refund/refund.types";

const RefundableList = () => {
    //State
    const [confirm, setConfirm] = useState<string | null>(null);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Product", "Order ID", "Quantity", "Action"];

    //Urql
    const [{ data }, refetch] = useQuery<GetRefundableProducts>({ query: GET_REFUNDABLE_PRODUCTS });

    return (
        <div className="mt-8">
            <h6 className="font-bold text-lg mb-3">All Refundable Products</h6>
            <div className="overflow-auto h-full w-full shadow rounded">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className={`border-b border-black border-opacity-5 bg-white p-3 ${head === "Action" ? "text-center" : "text-left"}`}>
                                    <Typography
                                        variant="small"
                                        className="leading-none opacity-70 text-textColor font-semibold"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.getRefundableProducts.map((item, i) => {
                            const classes = "p-3 border-b border-black border-opacity-5";
                            return (
                                <tr key={i}>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {i + 1}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex gap-2 items-center">
                                            <Image
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL as string + item.productId?.images[0] as string}
                                                alt={item.productId?.name as string}
                                                width={70}
                                                height={70}
                                                className="w-[40px] rounded"
                                            />
                                            <Typography variant="small" className="font-semibold text-[14px] line-clamp-1 max-w-[300px]">
                                                {item.productId?.name}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.order?.orderId}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.quantity}
                                        </Typography>
                                    </td>
                                    <td className={`${classes}`}>
                                        <div className="flex gap-3 justify-center items-center">
                                            <div>
                                                <Tooltip content="Add to Refund" placement="top" className="text-xs bg-black bg-opacity-70">
                                                    <button onClick={() => setConfirm(item.id)} className="py-1 px-2 bg-main rounded text-sm font-semibold text-white">
                                                        Add to Refund
                                                    </button>
                                                </Tooltip >
                                                <Add
                                                    open={item.id === confirm}
                                                    onClose={() => setConfirm(null)}
                                                    item={item}
                                                    refetch={refetch}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {data?.getRefundableProducts.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={5}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not refundable product yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RefundableList;