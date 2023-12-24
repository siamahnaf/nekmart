import { useState } from "react";
import { Dialog, DialogBody, Textarea } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Components
import { Notification } from "../Common/Notification";

//Urql
import { useMutation } from "urql";
import { ADD_REPLY } from "@/Urql/Query/Reviews/review.query";
import { ReviewData, AddReplyData } from "@/Urql/Types/Reviews/reviews.types";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    item: ReviewData;
    refetch: Function;
}

interface Inputs {
    reply: string;
}

const Details = ({ open, onClose, item, refetch }: Props) => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<AddReplyData>(ADD_REPLY);

    //Initialize Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>();

    //Handler on Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const formData = {
            reviewId: item.id,
            reply: value.reply
        }
        mutate({ replyInput: formData }).then(({ data }) => {
            setNotification(true)
            if (data?.replyReview.success) {
                refetch({ requestPolicy: "network-only" })
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
                {error?.message ?? data?.replyReview.message}
            </Notification>
            <DialogBody className="text-black p-5 max-h-[450px] overflow-auto">
                <h4 className="text-lg font-semibold mb-2">Product Name</h4>
                <p className="text-base opacity-90 mb-3">{item.product?.name}</p>
                <h4 className="text-lg font-semibold mb-2">Seller Name</h4>
                <p className="text-base opacity-90 mb-3">{item.seller?.shopName}</p>
                <h4 className="text-lg font-semibold mb-2">Customer Name</h4>
                <p className="text-base opacity-90 mb-3">{item.user?.name || item.user?.phone}</p>
                <h4 className="text-lg font-semibold mb-2">Comment</h4>
                <p className="text-base opacity-90 mb-3">{item.comment}</p>
                {item.reply &&
                    <>
                        <h4 className="text-lg font-semibold mb-2">Reply</h4>
                        <p className="text-base opacity-90 mb-3">{item.reply}</p>
                    </>
                }
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    <Textarea
                        label="Reply"
                        color="red"
                        {...register("reply", { required: true })}
                        className="mb-3"
                    />
                    <button className="bg-main uppercase font-semibold py-2 text-white px-4 rounded-md text-sm relative w-max" type="submit" disabled={fetching}>
                        <span className={fetching ? "opacity-30" : "opacity-100"}>Add reply</span>
                        <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                            {fetching &&
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </button>
                </form>
            </DialogBody>
        </Dialog>
    );
};

export default Details;