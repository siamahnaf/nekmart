import { useState } from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Avatar from "react-avatar";

//Helpers Function
import { isUrl } from "@/Helpers/url.helpers";

//Components
import Ban from "./Ban";
import Unbanned from "./Unbanned";
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_USERS, BAN_OR_UNBANNED_USER } from "@/Urql/Query/Authentication/user.query";
import { GetUsersData, BanOrUnbannedUserData } from "@/Urql/Types/Authentication/user.types";

const Lists = () => {
    //State
    const [notification, setNotification] = useState(false);
    const [ban, setBan] = useState<string | null>(null);
    const [unbanned, setUnbanned] = useState<string | null>(null);
    const [pagination, setPagination] = useState<number>(1);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Profile", "Name", "Phone", "Provider", "Status", "Action"];

    //Urql
    const [{ data }, refetch] = useQuery<GetUsersData>({ query: GET_USERS, variables: { searchInput: { limit: 20, page: pagination } }, requestPolicy: "cache-and-network" });
    const [{ data: banData, error, fetching }, mutate] = useMutation<BanOrUnbannedUserData>(BAN_OR_UNBANNED_USER);

    //On Delete Confirm
    const onBanConfirm = (id: string) => {
        mutate({ banOrUnbannedUserId: id, status: true }).then(() => {
            setNotification(true)
            setBan(null)
            refetch({ requestPolicy: "network-only" })
        }).catch(() => {
            setNotification(true)
            setBan(null)
        })
    }
    //On Delete Confirm
    const onUnbannedConfirm = (id: string) => {
        mutate({ banOrUnbannedUserId: id, status: false }).then(() => {
            setNotification(true)
            setUnbanned(null)
            refetch({ requestPolicy: "network-only" })
        }).catch(() => {
            setNotification(true)
            setUnbanned(null)
        })
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? banData?.banOrUnbannedUser.message}
            </Notification>
            <h6 className="font-bold text-lg mb-3">All Users</h6>
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
                        {data?.getUsers.results.map((item, i) => {
                            const classes = "p-3 border-b border-black border-opacity-5";
                            return (
                                <tr key={i}>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {i + 1}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        {isUrl(item.avatar as string) ? (
                                            <Avatar name={item?.name} textSizeRatio={2.4} size="35" src={item.avatar} round />
                                        ) : (
                                            <Avatar name={item?.name} textSizeRatio={2.4} size="35" src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.avatar}`} round />
                                        )}
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            +{item.phone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.provider?.name || "Own"}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] ${item.is_banned ? "text-red-600" : "text-green-600"}`}>
                                            {item.is_banned ? "Banned" : "Not Banned"}
                                        </Typography>
                                    </td>
                                    <td className={`${classes}`}>
                                        <div className="flex gap-3 justify-center items-center">
                                            {item.is_banned ? (
                                                <div>
                                                    <Tooltip content="Un-Ban user" placement="top" className="text-xs bg-black bg-opacity-70">
                                                        <button onClick={() => setUnbanned(item.id)}>
                                                            <Icon className="text-green-600" icon="simple-line-icons:ban" />
                                                        </button>
                                                    </Tooltip >
                                                    <Unbanned
                                                        open={unbanned === item.id}
                                                        onClose={() => setUnbanned(null)}
                                                        fetching={fetching}
                                                        id={item.id}
                                                        onConfirm={(id) => onUnbannedConfirm(id)}
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    <Tooltip content="Ban user" placement="top" className="text-xs bg-black bg-opacity-70">
                                                        <button onClick={() => setBan(item.id)}>
                                                            <Icon className="text-main" icon="simple-line-icons:ban" />
                                                        </button>
                                                    </Tooltip >
                                                    <Ban
                                                        open={ban === item.id}
                                                        onClose={() => setBan(null)}
                                                        fetching={fetching}
                                                        id={item.id}
                                                        onConfirm={(id) => onBanConfirm(id)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {data?.getUsers.results.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={4}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not users yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="p-3 flex gap-2 items-center">
                    <p className="text-sm flex-1">
                        Page <span className="font-semibold">{data?.getUsers.meta.currentPage}</span> of {data?.getUsers.meta.totalPages}
                    </p>
                    {data?.getUsers.meta.totalPages && data.getUsers.meta.totalPages > 1 &&
                        <div className="flex justify-end gap-2">
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination <= 1 ? "opacity-40" : "opacity-100"}`} disabled={pagination <= 1} onClick={() => setPagination(pagination - 1)}>
                                <Icon icon="ooui:next-rtl" />
                            </button>
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination >= (data?.getUsers?.meta?.totalPages || 0) ? "opacity-40" : "opacity-100"}`} disabled={pagination >= (data?.getUsers?.meta?.totalPages || 0)} onClick={() => setPagination(pagination + 1)}>
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