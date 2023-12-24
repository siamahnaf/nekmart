import { useState } from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

//Components
import Confirm from "../Common/Confirm";
import { Notification } from "../Common/Notifications";
import Details from "./Details";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_PRE_ORDER, DELETE_PRE_ORDER } from "@/Urql/Query/Preorder/preorder.query";
import { GetPreOrderData, DeletePreOrder } from "@/Urql/Types/Preorder/preorder.types";

const Lists = () => {
    //State
    const [notification, setNotification] = useState(false);
    const [confirm, setConfirm] = useState<string | null>(null);
    const [detail, setDetail] = useState<string | null>(null);
    const [pagination, setPagination] = useState<number>(1);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Name", "Image", "Phone", "Email", "Action"];

    //Urql
    const [{ data }, refetch] = useQuery<GetPreOrderData>({ query: GET_PRE_ORDER, variables: { searchInput: { limit: 20, page: pagination } }, requestPolicy: "cache-and-network" });
    const [{ data: deleteData, error, fetching }, mutate] = useMutation<DeletePreOrder>(DELETE_PRE_ORDER);

    //On Delete Confirm
    const onDeleteConfirm = (id: string) => {
        mutate({ deletePreorderId: id }).then(() => {
            setNotification(true)
            setConfirm(null)
            refetch({ requestPolicy: "network-only" })
        }).catch(() => {
            setNotification(true)
            setConfirm(null)
        })
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div className="mt-8">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? deleteData?.deletePreorder.message}
            </Notification>
            <h6 className="font-bold text-lg mb-3">All Preorder</h6>
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
                        {data?.getPreorder.results.map((item, i) => {
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
                                            {item.firstName} {item.lastName}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        {item.productImage &&
                                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item.productImage[0]} alt={item.firstName} width={100} height={100} className="w-[40px] rounded-md" />
                                        }
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.phone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.email}
                                        </Typography>
                                    </td>
                                    <td className={`${classes}`}>
                                        <div className="flex gap-3 justify-center items-center">
                                            <div>
                                                <Tooltip content="Delete Brand" placement="top" className="text-xs bg-black bg-opacity-70">
                                                    <button onClick={() => setDetail(item.id)} disabled={fetching} className="mt-1">
                                                        <Icon className="text-[17px]" icon="octicon:eye-16" />
                                                    </button>
                                                </Tooltip >
                                                <Details
                                                    open={detail === item.id}
                                                    onClose={() => setDetail(null)}
                                                    data={item}
                                                />
                                            </div>
                                            <div>
                                                <Tooltip content="Delete Brand" placement="top" className="text-xs bg-black bg-opacity-70">
                                                    <button onClick={() => setConfirm(item.id)} disabled={fetching}>
                                                        <Icon className="text-main" icon="icon-park-outline:delete" />
                                                    </button>
                                                </Tooltip >
                                                <Confirm
                                                    open={confirm === item.id}
                                                    onClose={() => setConfirm(null)}
                                                    fetching={fetching}
                                                    id={item.id}
                                                    onConfirm={(id) => onDeleteConfirm(id)}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {data?.getPreorder.results.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={6}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not preorder yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="p-3 flex gap-2 items-center">
                    <p className="text-sm flex-1">
                        Page <span className="font-semibold">{data?.getPreorder.meta.currentPage}</span> of {data?.getPreorder.meta.totalPages}
                    </p>
                    {data?.getPreorder.meta.totalPages && data.getPreorder.meta.totalPages > 1 &&
                        <div className="flex justify-end gap-2">
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination <= 1 ? "opacity-40" : "opacity-100"}`} disabled={pagination <= 1} onClick={() => setPagination(pagination - 1)}>
                                <Icon icon="ooui:next-rtl" />
                            </button>
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination >= (data?.getPreorder?.meta?.totalPages || 0) ? "opacity-40" : "opacity-100"}`} disabled={pagination >= (data?.getPreorder?.meta?.totalPages || 0)} onClick={() => setPagination(pagination + 1)}>
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