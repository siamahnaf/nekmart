import { useState } from "react";
import { Dialog, DialogBody, Select, Option } from "@material-tailwind/react";

//Components
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation } from "urql";
import { CHANGE_REFUND_STATUS } from "@/Urql/Query/Refund/refund.query";
import { ChangeRefundStatus, RefundData } from "@/Urql/Types/Refund/refund.types";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    item: RefundData;
    refetch: Function;
}

const Details = ({ open, onClose, item, refetch }: Props) => {
    //State
    const [notification, setNotification] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<ChangeRefundStatus>(CHANGE_REFUND_STATUS);

    //Handler on Submit
    const onChangeStatus = () => {
        if (status) {
            const formData = {
                changeRefundStatusId: item.id,
                refundStatusInput: {
                    status: status
                }
            }
            mutate({ ...formData }).then(({ data }) => {
                setNotification(true)
                if (data?.changeRefundStatus.success) {
                    refetch({ requestPolicy: "network-only" })
                }
            }).catch(() => {
                setNotification(true)
            })
        }
    };

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <Dialog
            open={open}
            handler={onClose}
            animate={{
                mount: { y: 0 },
                unmount: { y: -15 },
            }}
            size="md"
        >
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.changeRefundStatus.message}
            </Notification>
            <DialogBody className="text-black p-5 max-h-[450px] overflow-auto">
                <h4 className="text-lg font-semibold mb-2">Order ID</h4>
                <p className="text-base opacity-90 mb-3">{item.refundableId?.order?.orderId}</p>
                <h4 className="text-lg font-semibold mb-2">Product Name</h4>
                <p className="text-base opacity-90 mb-3">{item.refundableId?.productId?.name}</p>
                <h4 className="text-lg font-semibold mb-2">Seller Name</h4>
                <p className="text-base opacity-90 mb-3">{item.refundableId?.seller?.shopName}</p>
                <h4 className="text-lg font-semibold mb-2">Customer Name</h4>
                <p className="text-base opacity-90 mb-3">{item.user?.name || item.user?.phone}</p>
                <h4 className="text-lg font-semibold mb-2">Quantity</h4>
                <p className="text-base opacity-90 mb-3">{item.quantity}</p>

                <h4 className="text-lg font-semibold mb-2">Coupon Discount</h4>
                <p className="text-base opacity-90 mb-3">৳{item.refundableId?.couponDiscount}</p>

                <h4 className="text-lg font-semibold mb-2">Variation</h4>
                <p className="text-base opacity-90 mb-3 flex gap-4">
                    {item.refundableId?.variation.map((v, i) => (
                        <span key={i}><span className="font-semibold">{v.name}: </span>{v.variant}</span>
                    ))}
                </p>

                <h4 className="text-lg font-semibold mb-2">Address</h4>
                <p className="text-base opacity-90 mb-3">
                    <p><span className="font-semibold">City: </span>{item.refundableId?.address?.city}</p>
                    <p><span className="font-semibold">Area: </span>{item.refundableId?.address?.area}</p>
                    <p><span className="font-semibold">Address: </span>{item.refundableId?.address?.address}</p>
                </p>

                <h4 className="text-lg font-semibold mb-2">Reason</h4>
                <p className="text-base opacity-90 mb-3">{item.reason}</p>

                <h4 className="text-lg font-semibold mb-2">Description</h4>
                <p className="text-base opacity-90 mb-3">{item.description}</p>

                <h4 className="text-lg font-semibold mb-4">Change Status</h4>
                <Select
                    label="Select Status"
                    color="red"
                    onChange={(e) => setStatus(e as string)}
                    value={status}
                >
                    <Option value="Approved">Approve</Option>
                    <Option value="Cancelled">Cancel</Option>
                </Select>

                <button className="bg-main uppercase font-semibold py-2 text-white px-4 rounded-md text-sm relative w-max mt-5" onClick={onChangeStatus} disabled={fetching}>
                    <span className={fetching ? "opacity-30" : "opacity-100"}>Change</span>
                    <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                        {fetching &&
                            <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                        }
                    </div>
                </button>
            </DialogBody>
        </Dialog>
    );
};

export default Details;