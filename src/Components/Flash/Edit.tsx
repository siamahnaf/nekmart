import { useState, ChangeEvent } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { Datepicker, DateValueType } from "react-custom-datepicker-tailwind";
import { Icon } from "@iconify/react";
import moment from "moment";

//Component
import Timepicker from "../Common/Timepicker";
import ImageUploader from "../Common/ImageUploader";
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_SINGLE_FLASH, UPDATE_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GetSingleFlash, UpdateFlash } from "@/Urql/Types/Flash/flash.types";

interface Inputs {
    title: string;
    image: string;
    thumb: string;
    discount: string;
    discountUnit: string;
    start: DateValueType;
    startTime: string;
    expires: DateValueType;
    expireTime: string;
}
const Edit = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Initialize Hook
    const router = useRouter();

    //Finding Ids
    const parts = router.query.id?.toString().split('-') as string[];
    const id = parts[parts.length - 1];

    //Urql
    const [{ data: flashData }, refetch] = useQuery<GetSingleFlash>({ query: GET_SINGLE_FLASH, variables: { getFlashId: id } })
    const [{ data, error, fetching }, mutate] = useMutation<UpdateFlash>(UPDATE_FLASH);

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        control
    } = useForm<Inputs>({
        defaultValues: {
            title: flashData?.getFlash.title,
            image: flashData?.getFlash.image,
            thumb: flashData?.getFlash.thumb,
            discount: flashData?.getFlash.discount,
            discountUnit: flashData?.getFlash.discountUnit,
            start: { endDate: moment(flashData?.getFlash.start).format("DD-MM-YYYY"), startDate: moment(flashData?.getFlash.start).format("DD-MM-YYYY") },
            startTime: moment(flashData?.getFlash.start).format("hh:mm A"),
            expires: { endDate: moment(flashData?.getFlash.expires).format("DD-MM-YYYY"), startDate: moment(flashData?.getFlash.expires).format("DD-MM-YYYY") },
            expireTime: moment(flashData?.getFlash.expires).format("hh:mm A")
        }
    });

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const { startTime, expireTime, ...rest } = value;
        const formData = {
            ...rest,
            start: moment(`${value.start?.endDate} ${startTime}`, "YYYY-MM-DD h:mm A").format("YYYY-MM-DD HH:mm:ss.SSSSSSZ"),
            expires: moment(`${value.expires?.endDate} ${expireTime}`, "YYYY-MM-DD h:mm A").format("YYYY-MM-DD HH:mm:ss.SSSSSSZ")
        }
        mutate({ flashInput: formData, updateFlashId: id }).then(() => {
            setNotification(true)
            refetch({ requestPolicy: "network-only" })
        }).catch(() => {
            setNotification(true)
        })
    }

    return (
        <div>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.updateFlash.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Update Flash</h6>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Fill the form</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="name" className="col-span-1 w-max">Title</label>
                        <div className="col-span-3">
                            <Input
                                label="Title"
                                id="name"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("title", { required: true })}
                                error={errors.title ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="discount" className="col-span-1 w-max">Discount</label>
                        <div className="col-span-3">
                            <Input
                                label="Discount"
                                id="discount"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("discount", { required: true })}
                                error={errors.discount ? true : false}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="discountUnit" className="col-span-1 w-max">Discount Unit</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="discountUnit"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        label="Discount Unit"
                                        color="red"
                                        error={errors.discountUnit ? true : false}
                                        value={value}
                                        onChange={e => onChange(e)}
                                        id="discountUnit"
                                    >
                                        <Option value="flat">Flat</Option>
                                        <Option value="percent">Percent</Option>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="start" className="col-span-1 w-max">Start date</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="start"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Datepicker
                                        useRange={false}
                                        asSingle={true}
                                        value={value}
                                        onChange={onChange}
                                        primaryColor="red"
                                        displayFormat={"DD-MM-YYYY"}
                                        customInput={
                                            <Input
                                                label="Start date"
                                                color="red"
                                                id="start"
                                                value={value?.endDate as string}
                                                error={errors.expires ? true : false}
                                                icon={<Icon icon="uis:calender" />} crossOrigin={undefined} />
                                        }
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="startTime" className="col-span-1 w-max">Start time</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="startTime"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Timepicker
                                        label="Start time"
                                        value={value}
                                        onChange={onChange}
                                        error={errors.startTime ? true : false}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="expires" className="col-span-1 w-max">Expire date</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="expires"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Datepicker
                                        useRange={false}
                                        asSingle={true}
                                        value={value}
                                        onChange={onChange}
                                        primaryColor="red"
                                        displayFormat={"DD-MM-YYYY"}
                                        minDate={new Date(watch("start")?.endDate as string)}
                                        customInput={
                                            <Input
                                                label="Expire date"
                                                color="red"
                                                id="expires"
                                                value={value?.endDate as string}
                                                error={errors.expires ? true : false}
                                                icon={<Icon icon="uis:calender" />} crossOrigin={undefined} />
                                        }
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="expireTime" className="col-span-1 w-max">Expire time</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="expireTime"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Timepicker
                                        label="Expire time"
                                        value={value}
                                        onChange={onChange}
                                        error={errors.startTime ? true : false}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <ImageUploader
                        label="Thumbnail"
                        width={1500}
                        height={1008}
                        onChange={(e) => setValue("thumb", e)}
                        is_multiple={false}
                        className="mb-7"
                        folderName="Flashes"
                        value={watch("thumb")}
                    />
                    <ImageUploader
                        label="Banner"
                        width={1500}
                        height={360}
                        onChange={(e) => setValue("image", e)}
                        is_multiple={false}
                        folderName="Flashes"
                        value={watch("image")}
                    />
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Update Flash</span>
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

export default Edit;