import { useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";

//Components
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation } from "urql";
import { CHANGE_REVIEW_VISIBILITY } from "@/Urql/Query/Reviews/review.query";
import { ReviewData, ChangeReviewData } from "@/Urql/Types/Reviews/reviews.types";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    item: ReviewData;
    refetch: Function;
}

const Details = ({ open, onClose, item, refetch }: Props) => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<ChangeReviewData>(CHANGE_REVIEW_VISIBILITY);

    //Handler on Submit
    const onChangeVisibility = () => {
        mutate({ reviewId: item.id }).then(({ data }) => {
            setNotification(true)
            if (data?.changeReviewVisibility.success) {
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
                {error?.message ?? data?.changeReviewVisibility.message}
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
                <button className="bg-main uppercase font-semibold py-2 text-white px-4 rounded-md text-sm relative w-max" onClick={onChangeVisibility} disabled={fetching}>
                    <span className={fetching ? "opacity-30" : "opacity-100"}>{item.publish ? "Un-publish" : "Publish"}</span>
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