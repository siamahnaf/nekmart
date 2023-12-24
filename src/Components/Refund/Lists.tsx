import { useState } from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import moment from "moment";

//Components
import Details from "./Details";

//Urql
import { useQuery } from "urql";
import { GET_REFUND } from "@/Urql/Query/Refund/refund.query";
import { GetRefundData } from "@/Urql/Types/Refund/refund.types";

const Lists = () => {
    //State
    const [confirm, setConfirm] = useState<string | null>(null);
    const [pagination, setPagination] = useState<number>(1);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Order ID", "Customer", "Quantity", "Coupon Discount", "Date", "Status", "Action"];

    //Urql
    const [{ data }, refetch] = useQuery<GetRefundData>({ query: GET_REFUND, variables: { searchInput: { limit: 20, page: pagination } }, requestPolicy: "cache-and-network" });

    return (
        <div className="mt-8">
            <h6 className="font-bold text-lg mb-3">Refund Request</h6>
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
                        {data?.getRefundByAdmin.results.map((item, i) => {
                            const classes = "p-3 border-b border-black border-opacity-5";
                            return (
                                <tr key={i}>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {i + 1}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} max-w-[180px]`}>
                                        <Typography variant="small" className="font-semibold text-[14px] line-clamp-1">
                                            {item.refundableId?.order?.orderId}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.user?.name || item.user?.phone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.quantity}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.refundableId?.couponDiscount}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {moment(item.created_at).format("DD MMM YYYY")}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] ${item.status === "Approved" ? "text-green-600" : item.status === "Pending" ? "text-yellow-600" : "text-main"}`}>
                                            {item.status}
                                        </Typography>
                                    </td>
                                    <td className={`${classes}`}>
                                        <div className="flex gap-3 justify-center items-center">
                                            <div>
                                                <Tooltip content="Delete Brand" placement="top" className="text-xs bg-black bg-opacity-70">
                                                    <button onClick={() => setConfirm(item.id)}>
                                                        <Icon icon="ph:eye" />
                                                    </button>
                                                </Tooltip >
                                                <Details
                                                    open={confirm === item.id}
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
                        {data?.getRefundByAdmin.results.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={4}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not refund request yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="p-3 flex gap-2 items-center">
                    <p className="text-sm flex-1">
                        Page <span className="font-semibold">{data?.getRefundByAdmin.meta.currentPage}</span> of {data?.getRefundByAdmin.meta.totalPages}
                    </p>
                    {data?.getRefundByAdmin.meta.totalPages && data.getRefundByAdmin.meta.totalPages > 1 &&
                        <div className="flex justify-end gap-2">
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination <= 1 ? "opacity-40" : "opacity-100"}`} disabled={pagination <= 1} onClick={() => setPagination(pagination - 1)}>
                                <Icon icon="ooui:next-rtl" />
                            </button>
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination >= (data?.getRefundByAdmin?.meta?.totalPages || 0) ? "opacity-40" : "opacity-100"}`} disabled={pagination >= (data?.getRefundByAdmin?.meta?.totalPages || 0)} onClick={() => setPagination(pagination + 1)}>
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