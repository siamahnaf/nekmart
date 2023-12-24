import { useState, useEffect } from "react";
import { Dialog, Rating, Textarea } from "@material-tailwind/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

//Components
import ImagesUploader from "@/Components/Common/ImagesUploader";
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { CHECK_REVIEW, ADD_REVIEWS, GET_REVIEWS } from "@/Urql/Query/Review/review.query";
import { CheckReviewData, AddReviewData, GetReviewsData } from "@/Urql/Types/Review/review.types";

//Interface
interface Props {
    id: string;
    status: string;
    seller: string;
}
interface Inputs {
    comment: string;
    rating: number;
    image: string[];
}

const ReviewChecker = ({ id, status, seller }: Props) => {
    //State
    const [open, setOpen] = useState<boolean>(false);
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data: check }, refetchCheck] = useQuery<CheckReviewData>({ query: CHECK_REVIEW, variables: { checkReviewInput: { product: id } } });
    const [{ data, error, fetching }, mutate] = useMutation<AddReviewData>(ADD_REVIEWS);
    const [_, refetch] = useQuery<GetReviewsData>({ query: GET_REVIEWS, variables: { productId: id } })

    //Initialize Hook
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        watch,
        reset
    } = useForm<Inputs>()

    //On Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const formData = {
            ...value,
            product: id,
            seller: seller
        }
        mutate({ reviewInput: formData }).then(({ data }) => {
            setNotification(true)
            if (data) {
                refetch({ requestPolicy: "network-only" })
                refetchCheck({ requestPolicy: "network-only" })
                setOpen(false)
                reset()
            }
        }).catch(() => {
            setNotification(true)
        })
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //Lifecycle Hook
    useEffect(() => {
        register("image", { required: true })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.addReviews.message}
            </Notification>
            {check?.reviewAvailability.success === false && status === "Delivered" &&
                <button className="bg-main py-1 px-2 text-sm rounded-md text-white font-medium" onClick={() => setOpen(true)}>
                    Add Review
                </button>
            }
            <Dialog
                open={open}
                handler={() => setOpen(false)}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: -15 },
                }}
                size="md"
                className="p-5 text-black"
            >
                <h4 className="text-xl font-bold text-black">Add reviews</h4>
                <hr className="border-gray-300 my-4" />
                <form onSubmit={handleSubmit(onSubmit)} className="max-h-[450px] pr-4 overflow-auto">
                    <h4 className="text-base font-semibold opacity-70 mb-5">Upload Image</h4>
                    <ImagesUploader
                        label="Upload Image"
                        size={3}
                        onChange={(e) => setValue?.("image", e)}
                        folderName="Pre Order"
                        value={watch?.("image")}
                        className="mb-7"
                        displayLabel={false}
                        error={errors.image ? true : false}
                    />
                    <h4 className="text-base font-semibold opacity-70 mb-5">Rating Point</h4>
                    <Controller
                        name="rating"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <Rating
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.rating &&
                        <p className="text-main mt-2 text-sm">Please add a rating point!</p>
                    }
                    <h4 className="text-base font-semibold opacity-70 mb-5 mt-5">Your Honest Review</h4>
                    <Textarea
                        label="Your review"
                        color="red"
                        {...register("comment", { required: true })}
                    />
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-2 text-white px-4 rounded-md text-[13px] relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Add Reviews</span>
                            <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                {fetching &&
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                }
                            </div>
                        </button>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default ReviewChecker;