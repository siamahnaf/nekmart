import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import moment from "moment";

//Urql
import { useQuery } from "urql";
import { GET_CAMPAIGN } from "@/Urql/Query/Campaign/flash.query";
import { GetCampaignData } from "@/Urql/Types/Campaign/flash.types";

const Lists = () => {
    //State
    const [pagination, setPagination] = useState<number>(1);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Title", "Thumb", "Discount", "Start", "Expire", "Status"];

    //Urql
    const [{ data }, refetch] = useQuery<GetCampaignData>({ query: GET_CAMPAIGN, variables: { searchInput: { limit: 20, page: pagination } }, requestPolicy: "cache-and-network" });

    //Handler status
    const getStatus = (startDate: Date, expireDate: Date) => {
        const currentDate = new Date();
        const start = new Date(startDate);
        const expire = new Date(expireDate);
        const status =
            currentDate < start
                ? "Upcoming"
                : currentDate >= start && currentDate <= expire
                    ? "Running"
                    : "Expired";
        return status;
    }


    return (
        <div className="mt-12">
            <h6 className="font-bold text-lg mb-3">All Campaign</h6>
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
                        {data?.getFlashes.results.map((item, i) => {
                            const classes = "p-3 border-b border-black border-opacity-5";
                            return (
                                <tr key={i}>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {i + 1}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} max-w-[200px]`}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.title}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        {item.thumb &&
                                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item.thumb} alt={item.title} width={100} height={24} className="w-[40px] rounded" />
                                        }
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.discountUnit === "flat" && "৳"}{item.discount}{item.discountUnit === "percent" && "%"}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {moment(item.start).format("DD-MM-YYYY; hh:mm A")}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {moment(item.start).format("DD-MM-YYYY; hh:mm A")}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] ${getStatus(item.start, item.expires) === "Upcoming" ? "text-yellow-600" : getStatus(item.start, item.expires) === "Running" ? "text-green-600" : "text-red-600"}`}>
                                            {getStatus(item.start, item.expires)}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                        {data?.getFlashes.results.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={8}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not flash sale yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="p-3 flex gap-2 items-center">
                    <p className="text-sm flex-1">
                        Page <span className="font-semibold">{data?.getFlashes.meta.currentPage}</span> of {data?.getFlashes.meta.totalPages}
                    </p>
                    {data?.getFlashes.meta.totalPages && data.getFlashes.meta.totalPages > 1 &&
                        <div className="flex justify-end gap-2">
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination <= 1 ? "opacity-40" : "opacity-100"}`} disabled={pagination <= 1} onClick={() => setPagination(pagination - 1)}>
                                <Icon icon="ooui:next-rtl" />
                            </button>
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination >= (data?.getFlashes?.meta?.totalPages || 0) ? "opacity-40" : "opacity-100"}`} disabled={pagination >= (data?.getFlashes?.meta?.totalPages || 0)} onClick={() => setPagination(pagination + 1)}>
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