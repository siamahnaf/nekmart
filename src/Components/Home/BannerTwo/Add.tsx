import { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Component
import ImageUploader from "@/Components/Common/ImageUploader";
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { ADD_BANNER_TWO, GET_BANNER_TWO } from "@/Urql/Query/Home/banner-two.query";
import { AddBannerTwoData, GetBannerTwoData } from "@/Urql/Types/Home/banner-two.types";

interface Inputs {
    name: string;
    url: string;
    path: string;
}
const Add = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<AddBannerTwoData>(ADD_BANNER_TWO);
    const [_, refetch] = useQuery<GetBannerTwoData>({ query: GET_BANNER_TWO });

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        trigger
    } = useForm<Inputs>();

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ bannerInput: value }).then(({ data }) => {
            setNotification(true)
            if (data?.addBannerTwo.success) {
                reset()
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification(true)
        })
    }

    //Lifecycle Hook
    useEffect(() => {
        register("path", { required: true })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.addBannerTwo.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Create new banner</h6>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Fill the form</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="name" className="col-span-1 w-max">Name</label>
                        <div className="col-span-3">
                            <Input
                                label="Name"
                                id="name"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("name", { required: true })}
                                error={errors.name ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="url" className="col-span-1 w-max">URL</label>
                        <div className="col-span-3">
                            <Input
                                label="URL"
                                id="url"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("url", {
                                    required: true,
                                    pattern: /^(ftp|http|https):\/\/[^ "]+$/
                                })}
                                error={errors.url ? true : false}
                            />
                        </div>
                    </div>
                    <ImageUploader
                        label="Banner Image"
                        width={1500}
                        height={530}
                        onChange={(e) => {
                            setValue("path", e)
                            trigger("path")
                        }}
                        is_multiple={false}
                        folderName="Brands"
                        value={watch("path")}
                        error={errors.path ? true : false}
                    />
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Add banner</span>
                            <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                {fetching &&
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                }
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;