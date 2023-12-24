import { useState } from "react";
import { Typography, Tooltip, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import slugify from "slugify";

//Components
import Confirm from "../Common/Confirm";
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_SHIPPINGS, DELETE_SHIPPINGS, CHANGE_ACTIVE_STATUS } from "@/Urql/Query/Shippings/shipping.query";
import { GetShippingData, DeleteShippingData, ChangeActiveStatus } from "@/Urql/Types/Shippings/shipping.types";

//Animations
const animation = {
    unmount: {
        opacity: 0,
        transformOrigin: "top",
        transform: "scale(0.95)",
        transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] },
    },
    mount: {
        opacity: 1,
        transformOrigin: "top",
        transform: "scale(1)",
        transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] },
    },
};

const Lists = () => {
    //State
    const [notification, setNotification] = useState(false);
    const [confirm, setConfirm] = useState<string | null>(null);
    const [pagination, setPagination] = useState<number>(1);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Name", "Rate", "Estimate Delivery", "Status", "Action"];

    //Urql
    const [{ data }, refetch] = useQuery<GetShippingData>({ query: GET_SHIPPINGS, variables: { searchInput: { limit: 20, page: pagination } }, requestPolicy: "cache-and-network" });
    const [{ data: deleteData, error, fetching }, mutate] = useMutation<DeleteShippingData>(DELETE_SHIPPINGS);
    const [{ data: activeData, error: activeError, fetching: activeFetching }, activeMutate] = useMutation<ChangeActiveStatus>(CHANGE_ACTIVE_STATUS);


    //On Delete Confirm
    const onDeleteConfirm = (id: string) => {
        mutate({ deleteShippingId: id }).then(() => {
            setNotification(true)
            setConfirm(null)
            refetch({ requestPolicy: "network-only" })
        }).catch(() => {
            setNotification(true)
            setConfirm(null)
        })
    }

    //On Active change
    const onActiveChange = (id: string) => {
        activeMutate({ setShippingAsActiveId: id }).then(() => {
            setNotification(true)
            refetch({ requestPolicy: "network-only" })
        }).catch(() => {
            setNotification(true)
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
                {(error?.message ?? deleteData?.deleteShipping.message) || (activeError?.message ?? activeData?.setShippingAsActive.message)}
            </Notification>
            <h6 className="font-bold text-lg mb-3">All Shippings</h6>
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
                        {data?.getShippings.results.map((item, i) => {
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
                                            {item.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            ৳[{item.rateInsideDhaka}, {item.rateInSavar}, {item.rateOutsideDhaka}]
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.estimateDelivery} day(s)
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] ${item.active ? "text-green-600" : "text-yellow-600"}`}>
                                            {item.active ? "Active" : "In-Active"}
                                        </Typography>
                                    </td>
                                    <td className={`${classes}`}>
                                        <div className="flex gap-3 justify-center items-center">
                                            <div>
                                                <Tooltip content="Edit Brand" placement="top" className="text-xs bg-black bg-opacity-70">
                                                    <button>
                                                        <Link href={`/shippings/update-shipping/${slugify(item.name, { lower: true })}-${item.id}`}>
                                                            <Icon icon="mdi:file-edit" />
                                                        </Link>
                                                    </button>
                                                </Tooltip>
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
                                            <div>
                                                <Tooltip content="Change status" placement="top" className="text-xs bg-black bg-opacity-70">
                                                    <Popover
                                                        animate={animation}
                                                        placement="bottom"
                                                    >
                                                        <PopoverHandler>
                                                            <button>
                                                                <Icon className="text-black opacity-50" icon="bi:three-dots-vertical" />
                                                            </button>
                                                        </PopoverHandler>
                                                        <PopoverContent className="text-black py-2 px-2">
                                                            <button className="bg-white py-2 px-2 rounded-md capitalize text-black font-semibold hover:bg-main hover:text-white" onClick={() => onActiveChange(item.id)} disabled={activeFetching}>
                                                                Change status
                                                            </button>
                                                        </PopoverContent>
                                                    </Popover>
                                                </Tooltip >
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {data?.getShippings.results.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={6}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not brand yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="p-3 flex gap-2 items-center">
                    <p className="text-sm flex-1">
                        Page <span className="font-semibold">{data?.getShippings.meta.currentPage}</span> of {data?.getShippings.meta.totalPages}
                    </p>
                    {data?.getShippings.meta.totalPages && data.getShippings.meta.totalPages > 1 &&
                        <div className="flex justify-end gap-2">
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination <= 1 ? "opacity-40" : "opacity-100"}`} disabled={pagination <= 1} onClick={() => setPagination(pagination - 1)}>
                                <Icon icon="ooui:next-rtl" />
                            </button>
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination >= (data?.getShippings?.meta?.totalPages || 0) ? "opacity-40" : "opacity-100"}`} disabled={pagination >= (data?.getShippings?.meta?.totalPages || 0)} onClick={() => setPagination(pagination + 1)}>
                                <Icon icon="ooui:next-ltr" />
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
};

export default Lists;