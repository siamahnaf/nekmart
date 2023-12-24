import { useState } from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import slugify from "slugify";
import moment from "moment";

//Components
import Add from "./Add";

//Urql
import { useQuery } from "urql";
import { GET_REFUND_PRODUCT } from "@/Urql/Query/Refund/refund.query";
import { GetRefundData } from "@/Urql/Types/Refund/refund.types";

const RefundList = () => {
    //State
    const [confirm, setConfirm] = useState<string | null>(null);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Product", "Order ID", "Quantity", "Status", "Date"];

    //Urql
    const [{ data }, refetch] = useQuery<GetRefundData>({ query: GET_REFUND_PRODUCT });

    return (
        <div className="mt-12">
            <h6 className="font-bold text-lg mb-3">Refund History</h6>
            <div className="overflow-auto h-full w-full shadow rounded">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className={`border-b border-black border-opacity-5 bg-white p-3 ${head === "Action" ? "text-center" : "text-left"}`}>
                                    <Typography
                                        variant="small"
                                        className={`leading-none opacity-70 text-textColor font-semibold ${head === "Date" ? "text-right" : ""}`}
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.getRefundByUser.map((item, i) => {
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
                                                src={process.env.NEXT_PUBLIC_IMAGE_URL as string + item.refundableId?.productId?.images[0] as string}
                                                alt={item.refundableId?.productId?.name as string}
                                                width={70}
                                                height={70}
                                                className="w-[40px] rounded"
                                            />
                                            <Typography variant="small" className="font-semibold text-[14px] line-clamp-1 max-w-[300px]">
                                                {item.refundableId?.productId?.name}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.refundableId?.order?.orderId}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.quantity}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] ${item.status === "Pending" ? "text-yellow-600" : item.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                                            {item.status}
                                        </Typography>
                                    </td>
                                    <td className={classes + " text-right"}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {moment(item.created_at).format("DD MMM YYYY")}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                        {data?.getRefundByUser.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={5}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not refund product yet!
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

export default RefundList;