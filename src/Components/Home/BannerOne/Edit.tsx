import { useState, useEffect } from "react";
import { Dialog, DialogBody, Input } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Components
import ImageUploader from "@/Components/Common/ImageUploader";
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { UPDATE_BANNER_ONE, GET_BANNER_ONE } from "@/Urql/Query/Home/banner-one.query";
import { BannerData, UpdateBannerOneData, GetBannerOneData } from "@/Urql/Types/Home/banner-one.types";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    banners: BannerData;
}
interface Inputs {
    name: string;
    url: string;
    path: string;
}

const Edit = ({ open, onClose, banners }: Props) => {
    //State
    const [notification, setNotification] = useState(false);


    //Urql
    const [_, refetch] = useQuery<GetBannerOneData>({ query: GET_BANNER_ONE });
    const [{ data, error, fetching }, mutate] = useMutation<UpdateBannerOneData>(UPDATE_BANNER_ONE);

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue,
        trigger
    } = useForm<Inputs>({
        defaultValues: {
            name: banners.name,
            url: banners.url,
            path: banners.path
        }
    });

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ bannerInput: value, updateBannerOneId: banners.id }).then(({ data }) => {
            setNotification(true)
            if (data?.updateBannerOne.success) {
                refetch({ requestPolicy: "network-only" })
                onClose()
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
        reset({
            name: banners.name,
            url: banners.url,
            path: banners.path
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [banners])

    return (
        <div className="w-0">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.updateBannerOne.message}
            </Notification>
            <Dialog
                open={open}
                handler={onClose}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: -15 },
                }}
                size="lg"
            >
                <DialogBody className="text-black text-left py-8">
                    <h6 className="font-bold text-lg mb-8">Update Banner</h6>
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
                                <button className="bg-main uppercase font-semibold py-3 text-white px-4 rounded-md text-sm relative" type="submit" disabled={fetching}>
                                    <span className={fetching ? "opacity-30" : "opacity-100"}>Update banner</span>
                                    <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                        {fetching &&
                                            <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                        }
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>

                </DialogBody>
            </Dialog>
        </div>
    );
};

export default Edit;