import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

//Components
import Confirm from "@/Components/Common/Confirm";
import { Notification } from "@/Components/Common/Notifications";
import Edit from "./Edit";

//Urql
import { useQuery, useMutation } from "urql";
import { GET_BANNER_TWO, DELETE_BANNER_TWO } from "@/Urql/Query/Home/banner-two.query";
import { GetBannerTwoData, DeleteBannerTwoData } from "@/Urql/Types/Home/banner-two.types";

const Lists = () => {
    //State
    const [notification, setNotification] = useState(false);
    const [confirm, setConfirm] = useState<string | null>(null);
    const [edit, setEdit] = useState<string | null>(null);

    //Urql
    const [{ data }, refetch] = useQuery<GetBannerTwoData>({ query: GET_BANNER_TWO });
    const [{ data: deleteData, error, fetching }, mutate] = useMutation<DeleteBannerTwoData>(DELETE_BANNER_TWO);

    //On Delete Confirm
    const onDeleteConfirm = (id: string) => {
        mutate({ deleteBannerTwoId: id }).then(() => {
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
                {error?.message ?? deleteData?.deleteBannerTwo.message}
            </Notification>
            <h4 className="font-bold text-lg mb-5">All banners</h4>
            <div className="grid grid-cols-3 gap-5">
                {data?.getBannerTwo.map((item, i) => (
                    <div className="border border-solid border-gray-200 rounded-md overflow-hidden" key={i}>
                        <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item.path} alt={item.name} width={325} height={118} className="w-full" />
                        <div className="flex justify-center py-2 gap-3">
                            <button className="bg-transparent p-1.5 rounded-md hover:bg-main hover:text-white" onClick={() => setEdit(item.id)}>
                                <Icon icon="uil:edit" />
                            </button>
                            <button className="bg-transparent p-1.5 rounded-md hover:bg-main hover:text-white" onClick={() => setConfirm(item.id)}>
                                <Icon icon="fluent:delete-24-filled" />
                            </button>
                            <Confirm
                                open={confirm === item.id}
                                onClose={() => setConfirm(null)}
                                fetching={fetching}
                                id={item.id}
                                onConfirm={(id) => onDeleteConfirm(id)}
                            />
                            <Edit
                                open={edit === item.id}
                                onClose={() => setEdit(null)}
                                banners={item}
                            />
                        </div>
                    </div>
                ))}
                {data?.getBannerTwo.length === 0 &&
                    <p className="text-base opacity-50">No banner created yet</p>
                }
            </div>
        </div>
    );
};

export default Lists;