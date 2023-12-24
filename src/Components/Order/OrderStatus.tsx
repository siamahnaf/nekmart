import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { useRouter } from "next/router";

//Data
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { CHANGE_ORDER_STATUS, GET_SINGLE_ORDER, CANCEL_ORDER } from "@/Urql/Query/Order/order.query";
import { ChangeOrderStatus, GetSingleOrder, CancelOrderStatus } from "@/Urql/Types/Order/order.types";

//Interface
interface Props {
    id: string;
}

const OrderStatus = ({ id }: Props) => {
    //Initialize Hook
    const router = useRouter();

    //State
    const [status, setStatus] = useState<string>("");
    const [notification, setNotification] = useState<boolean>(false);
    const [notification2, setNotification2] = useState<boolean>(false);

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<ChangeOrderStatus>(CHANGE_ORDER_STATUS);
    const [{ data: cancel, error: cancelError, fetching: cancelFetching }, cancelMutate] = useMutation<CancelOrderStatus>(CANCEL_ORDER);
    const [_, refetch] = useQuery<GetSingleOrder>({ query: GET_SINGLE_ORDER, variables: { getOrderId: router.query.id } });

    //Handler onChange
    const onChange = () => {
        if (status && status !== "Cancelled") {
            mutate({ orderSellerId: id, status: status }).then(({ data }) => {
                setNotification(true)
                if (data?.changeOrderStatus.success) {
                    refetch({ requestPolicy: "network-only" })
                }
            }).catch(() => {
                setNotification(true)
            })
        } else if (status === "Cancelled") {
            cancelMutate({ orderSellerId: id }).then(({ data }) => {
                setNotification2(true)
                if (data?.cancelOrderStatusByAdmin.success) {
                    refetch({ requestPolicy: "network-only" })
                }
            }).catch(() => {
                setNotification2(true)
            })
        }
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };
    const onNotification2 = () => {
        setNotification2(false);
    };

    return (
        <div className="mt-8">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.changeOrderStatus.message}
            </Notification>
            <Notification
                open={notification2}
                handleClose={onNotification2}
                severity={cancelError?.message ? "error" : "success"}
            >
                {cancelError?.message ?? cancel?.cancelOrderStatusByAdmin.message}
            </Notification>
            <h4 className="text-lg font-semibold mb-5">Order Status</h4>
            <div className="border border-solid border-gray-300 px-5 pb-5 pt-5 rounded-md">
                <Select
                    label="Select Status"
                    color="red"
                    onChange={(e) => setStatus(e as string)}
                >
                    <Option value="Pending">Pending</Option>
                    <Option value="Confirmed">Confirmed</Option>
                    <Option value="Picked up">Picked up</Option>
                    <Option value="On the way">On the way</Option>
                    <Option value="Delivered">Delivered</Option>
                    <Option value="Cancelled">Cancelled</Option>
                </Select>
                <div className="text-right mt-10">
                    <button className="bg-main uppercase font-semibold py-2 text-white px-4 rounded-md text-sm relative w-max" onClick={onChange} disabled={fetching || cancelFetching}>
                        <span className={(fetching || cancelFetching) ? "opacity-30" : "opacity-100"}>Change Status</span>
                        <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                            {(fetching || cancelFetching) &&
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;