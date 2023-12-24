import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import moment from "moment";
import { Icon } from "@iconify/react";

//Components
import { Notification } from "../Common/Notification";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_PROCESSING_WITHDRAW, CONFIRM_PAYMENT } from "@/Urql/Query/Withdraw/withdraw.query";
import { GetProcessingWithdraw, ConfirmPaymentData } from "@/Urql/Types/Withdraw/withdraw.types";

const ProcessingWithdraw = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Released By", "Method", "Amount", "Status", "Date", "Action"];

    //Urql
    const [{ data }, refetch] = useQuery<GetProcessingWithdraw>({ query: GET_PROCESSING_WITHDRAW });
    const [{ data: confirm, error }, mutate] = useMutation<ConfirmPaymentData>(CONFIRM_PAYMENT);

    //Handler
    const onAccepts = (id: string) => {
        mutate({ withdrawId: id }).then(({ data }) => {
            setNotification(true)
            if (data?.confirmPayment.success) {
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification(true)
        })
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div className="mt-4">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? confirm?.confirmPayment.message}
            </Notification>
            <h6 className="font-bold text-lg mb-3">Processing Withdraw</h6>
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
                        {data?.getProcessingWithdraw.map((item, i) => {
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
                                            {item.releasedBy?.name || item.releasedBy?.phone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.method}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.amount}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] ${item.status === "Processing" ? "text-yellow-600" : "text-green-600"}`}>
                                            {item.status}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {moment(item.created_at).format("DD MMM YYYY")}
                                        </Typography>
                                    </td>
                                    <td className={classes + " text-center"}>
                                        <div>
                                            <button className="text-lg" onClick={() => onAccepts(item.id)}>
                                                <Icon icon="charm:tick-double" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {data?.getProcessingWithdraw.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={6}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not history yet!
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

export default ProcessingWithdraw;