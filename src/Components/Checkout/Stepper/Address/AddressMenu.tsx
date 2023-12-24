import { useState, useRef } from "react";
import { Icon } from "@iconify/react";

//Custom Hook
import { useOutsideClick } from "@/Helpers/hook";

//Components
import UpdateAddress from "./UpdateAddress";
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { MARK_AS_DEFAULT, DELETE_ADDRESS, GET_ADDRESS } from "@/Urql/Query/Checkout/checkout.query";
import { AddressData, MarkAddressData, DeleteAddressData } from "@/Urql/Types/Checkout/checkout.types";

//interface
interface Props {
    item: AddressData;
}
const AddressMenu = ({ item }: Props) => {
    //State
    const [menu, setMenu] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [notification1, setNotification1] = useState<boolean>(false);
    const [notification2, setNotification2] = useState<boolean>(false);

    //Urql
    const [{ data: mark, error: markError, fetching: markFetching }, markMutate] = useMutation<MarkAddressData>(MARK_AS_DEFAULT);
    const [{ data, error, fetching }, mutate] = useMutation<DeleteAddressData>(DELETE_ADDRESS);
    const [_, refetch] = useQuery({ query: GET_ADDRESS })

    //Initialize Hook
    const ref = useRef<HTMLDivElement | null>(null);

    //Use outside Click
    useOutsideClick(ref, () => setMenu(false));

    //Handler
    const onMark = () => {
        markMutate({ markAddDefaultId: item.id }).then(({ data }) => {
            setNotification1(true)
            if (data?.markAddDefault.success) {
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification1(true)
        })
    }

    const onDelete = () => {
        mutate({ deleteAddressId: item.id }).then(({ data }) => {
            setNotification2(true)
            if (data?.deleteAddress.success) {
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification2(true)
        })
    }

    //Handler -- notification
    const onNotification1 = () => {
        setNotification1(false);
    };

    //Handler -- notification
    const onNotification2 = () => {
        setNotification2(false);
    };

    return (
        <div className="absolute top-4 right-4 z-40" ref={ref}>
            <Notification
                open={notification1}
                handleClose={onNotification1}
                severity={markError?.message ? "error" : "success"}
            >
                {markError?.message ?? mark?.markAddDefault.message}
            </Notification>
            <Notification
                open={notification2}
                handleClose={onNotification2}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.deleteAddress.message}
            </Notification>
            <button onClick={() => setMenu(!menu)} className="p-1.5">
                <Icon icon="akar-icons:more-vertical" />
            </button>
            <div className={`absolute right-0 top-full bg-white w-[200px] shadow-3xl border border-solid border-gray-300 p-4 transition-all ${menu ? "visible translate-y-0 opacity-100" : "opacity-0 invisible translate-y-2"}`}>
                <ul>
                    <li className="bg-white px-2 py-1 rounded-md hover:bg-main cursor-pointer select-none hover:text-white" onClick={() => setEdit(true)}>
                        Edit
                    </li>
                    <li className={`bg-white px-2 py-1 rounded-md hover:bg-main cursor-pointer select-none hover:text-white group relative ${item.default ? "opacity-50 pointer-events-none" : ""}`} onClick={onMark}>
                        Set as Default
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            {markFetching &&
                                <div className="w-3 h-3 border-b-2 border-main group-hover:border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </li>
                    <li className="bg-white px-2 py-1 rounded-md hover:bg-main cursor-pointer select-none hover:text-white group relative" onClick={onDelete}>
                        Delete
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            {fetching &&
                                <div className="w-3 h-3 border-b-2 border-main group-hover:border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </li>
                </ul>
            </div>
            <UpdateAddress
                open={edit}
                onClose={() => setEdit(false)}
                item={item}
            />
        </div>
    );
};

export default AddressMenu;