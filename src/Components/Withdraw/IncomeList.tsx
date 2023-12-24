import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import moment from "moment";

//Urql
import { useQuery } from "urql";
import { GET_INCOME_HISTORY } from "@/Urql/Query/Withdraw/withdraw.query";
import { GetIncomeData } from "@/Urql/Types/Withdraw/withdraw.types";

const IncomeList = () => {
    //State
    const [pagination, setPagination] = useState<number>(1);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Order ID", "Amount", "Date", "Payout", "Payable date"];

    //Urql
    const [{ data }] = useQuery<GetIncomeData>({ query: GET_INCOME_HISTORY, variables: { searchInput: { page: 1, limit: 20 } }, requestPolicy: "cache-and-network" });

    return (
        <div className="mt-8">
            <h6 className="font-bold text-lg mb-3">Income History</h6>
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
                        {data?.getIncomeHistory.results.map((item, i) => {
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
                                            {item.orderId?.orderId}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.income}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {moment(item.created_at).format("DD MMM YYYY")}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] ${item.paySuccess ? "text-green-600" : "text-yellow-600"}`}>
                                            {item.paySuccess ? "Paid" : "Pending"}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {moment(item.created_at).add(15, "days").format("DD MMM YYYY")}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                        {data?.getIncomeHistory.results.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={6}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not history yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="p-3 flex gap-2 items-center">
                    <p className="text-sm flex-1">
                        Page <span className="font-semibold">{data?.getIncomeHistory.meta.currentPage}</span> of {data?.getIncomeHistory.meta.totalPages}
                    </p>
                    {data?.getIncomeHistory.meta.totalPages && data.getIncomeHistory.meta.totalPages > 1 &&
                        <div className="flex justify-end gap-2">
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination <= 1 ? "opacity-40" : "opacity-100"}`} disabled={pagination <= 1} onClick={() => setPagination(pagination - 1)}>
                                <Icon icon="ooui:next-rtl" />
                            </button>
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination >= (data?.getIncomeHistory?.meta?.totalPages || 0) ? "opacity-40" : "opacity-100"}`} disabled={pagination >= (data?.getIncomeHistory?.meta?.totalPages || 0)} onClick={() => setPagination(pagination + 1)}>
                                <Icon icon="ooui:next-ltr" />
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default IncomeList;