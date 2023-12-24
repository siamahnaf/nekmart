import { useState } from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import { Icon } from "@iconify/react";

//Components
import Details from "./Details";

//Urql
import { useQuery } from "urql";
import { GET_REVIEWS } from "@/Urql/Query/Reviews/review.query";
import { GetReviewData } from "@/Urql/Types/Reviews/reviews.types";

const Lists = () => {
    //State
    const [confirm, setConfirm] = useState<string | null>(null);
    const [pagination, setPagination] = useState<number>(1);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Product", "User", "Seller", "Rating", "Status", "Action"];

    //Urql
    const [{ data }, refetch] = useQuery<GetReviewData>({ query: GET_REVIEWS, variables: { searchInput: { limit: 20, page: pagination } }, requestPolicy: "cache-and-network" });

    return (
        <div className="mt-8">
            <h6 className="font-bold text-lg mb-3">All Product Reviews</h6>
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
                        {data?.getReviewBySeller.results.map((item, i) => {
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
                                            {item.product?.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.user?.name || item.user?.phone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.seller?.shopName}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.rating} star
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] ${item.publish ? "text-green-600" : "text-main"}`}>
                                            {item.publish ? "Unpublished" : "Published"}
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
                        {data?.getReviewBySeller.results.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={4}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not reviews yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="p-3 flex gap-2 items-center">
                    <p className="text-sm flex-1">
                        Page <span className="font-semibold">{data?.getReviewBySeller.meta.currentPage}</span> of {data?.getReviewBySeller.meta.totalPages}
                    </p>
                    {data?.getReviewBySeller.meta.totalPages && data.getReviewBySeller.meta.totalPages > 1 &&
                        <div className="flex justify-end gap-2">
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination <= 1 ? "opacity-40" : "opacity-100"}`} disabled={pagination <= 1} onClick={() => setPagination(pagination - 1)}>
                                <Icon icon="ooui:next-rtl" />
                            </button>
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination >= (data?.getReviewBySeller?.meta?.totalPages || 0) ? "opacity-40" : "opacity-100"}`} disabled={pagination >= (data?.getReviewBySeller?.meta?.totalPages || 0)} onClick={() => setPagination(pagination + 1)}>
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