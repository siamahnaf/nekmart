import { useState } from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import slugify from "slugify";

//Components
import Confirm from "@/Components/Common/Confirm";
import { Notification } from "@/Components/Common/Notifications";
import Edit from "./Edit";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_SECTIONS, DELETE_SECTION } from "@/Urql/Query/Home/section.query";
import { GetSectionsData, DeleteSectionData } from "@/Urql/Types/Home/section.types";

const Lists = () => {
    //State
    const [notification, setNotification] = useState(false);
    const [confirm, setConfirm] = useState<string | null>(null);
    const [edit, setEdit] = useState<string | null>(null);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Name", "Description", "Base", "Category", "Status", "Action"];

    //Urql
    const [{ data }, refetch] = useQuery<GetSectionsData>({ query: GET_SECTIONS });
    const [{ data: deleteData, error, fetching }, mutate] = useMutation<DeleteSectionData>(DELETE_SECTION);

    //On Delete Confirm
    const onDeleteConfirm = (id: string) => {
        mutate({ deleteSectionId: id }).then(() => {
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
                {error?.message ?? deleteData?.deleteSection.message}
            </Notification>
            <h6 className="font-bold text-lg mb-3">All Sections</h6>
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
                        {data?.getSections.map((item, i) => {
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
                                            {item.description}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px] capitalize">
                                            {item.base}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px] capitalize">
                                            {item.category?.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] capitalize ${item.publish ? "text-green-600" : "text-main"}`}>
                                            {item.publish ? "Published" : "Archived"}
                                        </Typography>
                                    </td>
                                    <td className={`${classes}`}>
                                        <div className="flex gap-3 justify-center items-center">
                                            <div>
                                                <Tooltip content="Edit Brand" placement="top" className="text-xs bg-black bg-opacity-70">
                                                    <button onClick={() => setEdit(item.id)}>
                                                        <Icon icon="mdi:file-edit" />
                                                    </button>
                                                </Tooltip>
                                                <Edit
                                                    open={item.id === edit}
                                                    onClose={() => setEdit(null)}
                                                    section={item}
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
                        {data?.getSections.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={7}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not section yet!
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

export default Lists;