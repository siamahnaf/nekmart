import { useState } from "react";
import { Dialog, DialogBody, Select, Option } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import moment from "moment";

//Components
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { RELEASE_PAYMENT, GET_PREVIOUS_WITHDRAW } from "@/Urql/Query/Withdraw/withdraw.query";
import { ReleasePaymentData } from "@/Urql/Types/Withdraw/withdraw.types";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    currentIncome: number;
    sellerId: string;
    incomeIds: string[];
    lastPaymentDate: Date | undefined | null;
    refetch: Function;
}

const ReleasePayment = ({ open, onClose, currentIncome, sellerId, incomeIds, lastPaymentDate, refetch }: Props) => {
    //State
    const [notification, setNotification] = useState<boolean>(false);
    const [method, setMethod] = useState<string>("bank");

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<ReleasePaymentData>(RELEASE_PAYMENT);
    const [_, refetchWithdraw] = useQuery({ query: GET_PREVIOUS_WITHDRAW, variables: { sellerId: sellerId, searchInput: { page: 1, limit: 20 } } })

    //Handler on Submit
    const onReleasePayment = () => {
        const formData = {
            seller: sellerId,
            amount: currentIncome,
            method,
            incomesIds: incomeIds
        }
        mutate({ paymentInput: formData }).then(({ data }) => {
            setNotification(true)
            if (data?.releasePayment.success) {
                refetch({ requestPolicy: "network-only" })
                refetchWithdraw({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification(true)
        })
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
                {error?.message ?? data?.releasePayment.message}
            </Notification>
            <DialogBody className="text-black p-5 max-h-[450px] overflow-auto">
                <h3 className="text-lg font-bold">Release payment</h3>
                <hr className="border-gray-300 mt-4" />
                <div className="flex gap border border-solid border-gray-300 bg-gray-200 rounded-md mt-6">
                    <p className="flex-[0_0_60%] border-r border-gray-300 py-2 text-base font-medium px-4">Due to seller</p>
                    <p className="px-4 py-2 text-base font-semibold">৳{currentIncome}</p>
                </div>
                <h4 className="text-base font-medium mt-4 mb-6">Method</h4>
                <Select
                    label="Select Payment Method"
                    color="red"
                    onChange={(e) => setMethod(e as string)}
                    value={method}
                >
                    <Option value="bank">Bank</Option>
                    <Option value="bkash">Bkash</Option>
                    <Option value="nagad">Nagad</Option>
                    <Option value="others">Others</Option>
                </Select>
                <div className="text-center mt-6">
                    <Icon className="text-4xl text-main mx-auto" icon="bxs:error" />
                    <h5 className="text-lg font-semibold mt-3">Please beware about this payment</h5>
                </div>
                <div className="flex gap-3 justify-end mt-7 items-center">
                    {lastPaymentDate && moment(lastPaymentDate).add(15, "days") > moment() &&
                        <p className="text-sm opacity-60 font-medium">Next payment date {moment(lastPaymentDate).add(15, "days").format("DD MMM YYYY")}</p>
                    }
                    <button className={`bg-main py-1 px-4 rounded text-white text-sm font-semibold relative ${currentIncome <= 0 ? "opacity-60" : ""} ${!lastPaymentDate || moment(lastPaymentDate).add(15, "days") > moment() ? "opacity-60" : ""}`} disabled={currentIncome <= 0 || (!lastPaymentDate || moment(lastPaymentDate).add(15, "days") > moment())} onClick={onReleasePayment}>
                        <span className={fetching ? "opacity-30" : "opacity-100"}>
                            Release payment
                        </span>
                        <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                            {fetching &&
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </button>

                    <button className="border border-main py-1 px-4 rounded" onClick={onClose}>Close</button>
                </div>
            </DialogBody>
        </Dialog>
    );
};

export default ReleasePayment;