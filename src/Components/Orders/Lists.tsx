import { useState } from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import moment from "moment";

//Urql
import { useQuery } from "urql";
import { GET_ORDERS } from "@/Urql/Query/Order/order.query";
import { GetOrdersData } from "@/Urql/Types/Order/order.types";

const Lists = () => {
    //State
    const [pagination, setPagination] = useState<number>(1);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Order ID", "Customer Name", "Total", "Date", "Status", "Action"];

    //Urql
    const [{ data }] = useQuery<GetOrdersData>({ query: GET_ORDERS, variables: { searchInput: { limit: 20, page: pagination } }, requestPolicy: "cache-and-network" });

    //Get Status color
    const getColor = (status: string) => {
        if (status === "Pending") return "text-[#e67451]";
        else if (status === "Confirmed") return "text-[#b2c248]"
        else if (status === "Picked up") return "text-[#6495ed]"
        else if (status === "On the way") return "text-[#ffd801]"
        else if (status === "Delivered") return "text-green-600"
        else return "text-[#FF0000]"
    }

    return (
        <div className="mt-8">
            <h6 className="font-bold text-lg mb-3">All Orders</h6>
            <div className="overflow-auto h-full w-full shadow rounded">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className={`border-b border-black border-opacity-5 bg-white p-4 ${head === "Action" ? "text-center" : "text-left"}`}>
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
                        {data?.getOrdersBySeller.results.map((item, i) => {
                            const classes = "p-3 border-b border-black border-opacity-5";
                            return (
                                <tr key={i}>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {i + 1}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.order?.orderId}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.order?.shippingAddress.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            ৳{item.price}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {moment(item.created_at).format("DD MMM YYYY")}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] ${getColor(item.status)}`}>
                                            {item.status}
                                        </Typography>
                                    </td>
                                    <td className={`${classes}`}>
                                        <div className="flex gap-3 justify-center items-center">
                                            <div>
                                                <Tooltip content="Edit Brand" placement="top" className="text-xs bg-black bg-opacity-70">
                                                    <button>
                                                        <Link href={`/orders/${item.id}`}>
                                                            <Icon icon="bi:eye" />
                                                        </Link>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {data?.getOrdersBySeller.results.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={6}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not order yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="p-3 flex gap-2 items-center">
                    <p className="text-sm flex-1">
                        Page <span className="font-semibold">{data?.getOrdersBySeller.meta.currentPage}</span> of {data?.getOrdersBySeller.meta.totalPages}
                    </p>
                    {data?.getOrdersBySeller.meta.totalPages && data.getOrdersBySeller.meta.totalPages > 1 &&
                        <div className="flex justify-end gap-2">
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination <= 1 ? "opacity-40" : "opacity-100"}`} disabled={pagination <= 1} onClick={() => setPagination(pagination - 1)}>
                                <Icon icon="ooui:next-rtl" />
                            </button>
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination >= (data?.getOrdersBySeller?.meta?.totalPages || 0) ? "opacity-40" : "opacity-100"}`} disabled={pagination >= (data?.getOrdersBySeller?.meta?.totalPages || 0)} onClick={() => setPagination(pagination + 1)}>
                                <Icon icon="ooui:next-ltr" />
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Lists;