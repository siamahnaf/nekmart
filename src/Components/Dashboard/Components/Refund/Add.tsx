import { useState, Fragment } from "react";
import { Dialog, DialogBody, Input, Textarea, Select, Option } from "@material-tailwind/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

//Components
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation } from "urql";
import { ADD_REFUND } from "@/Urql/Query/Refund/refund.query";
import { AddRefundData, RefundableProduct } from "@/Urql/Types/Refund/refund.types";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    item: RefundableProduct;
    refetch: Function;
}
interface Inputs {
    quantity: string;
    reason: string;
    description: string;
}

const Add = ({ open, onClose, item, refetch }: Props) => {
    //State
    const [notification1, setNotification1] = useState<boolean>(false);
    const [notification2, setNotification2] = useState<boolean>(false);

    //Initialize Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<Inputs>()

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<AddRefundData>(ADD_REFUND);

    //Handler on Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const formData = {
            ...value,
            quantity: Number(value.quantity),
            refundableId: item.id
        }
        mutate({ refundInput: formData }).then(({ error, data }) => {
            if (error) setNotification2(true)
            if (data?.addRefund.success) {
                setNotification1(true)
                onClose()
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification2(true)
        })
    };

    //Handler -- notification
    const onNotification = () => {
        setNotification2(false);
        setNotification1(false);
    };

    return (
        <Fragment>
            <Notification
                open={notification1}
                handleClose={onNotification}
                severity="success"
            >
                {data?.addRefund.message}
            </Notification>
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
                    open={notification2}
                    handleClose={onNotification}
                    severity="error"
                >
                    {error?.message}
                </Notification>
                <DialogBody className="text-black p-5 max-h-[450px] overflow-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h4 className="text-base font-semibold opacity-80 mb-3">Select Quantity</h4>
                        <Controller
                            control={control}
                            name="quantity"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    label="Quantity"
                                    color="red"
                                    onChange={(e) => onChange(e as string)}
                                    value={value}
                                    error={errors.quantity ? true : false}
                                >
                                    {Array.from({ length: item.quantity }, (_, index) => index + 1).map((value) => {
                                        return (
                                            <Option key={value} value={value.toString()}>
                                                {value}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            )}
                        />

                        <h4 className="text-base font-semibold opacity-80 mt-4 mb-3">Type your reason</h4>
                        <Input
                            label="Reason"
                            color="red"
                            crossOrigin="anonymous"
                            {...register("reason", { required: true })}
                            error={errors.reason ? true : false}
                        />

                        <h4 className="text-base font-semibold opacity-80 mt-4 mb-3">Description</h4>
                        <Textarea
                            label="Description"
                            color="red"
                            {...register("description", { required: true })}
                            error={errors.description ? true : false}
                        />

                        <button className="bg-main uppercase font-semibold py-2 text-white px-4 rounded-md text-sm relative w-max mt-4" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Confirm</span>
                            <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                {fetching &&
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                }
                            </div>
                        </button>
                    </form>
                </DialogBody>
            </Dialog>
        </Fragment>
    );
};

export default Add;