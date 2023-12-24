import { useState, ChangeEvent } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Datepicker, DateValueType } from "react-custom-datepicker-tailwind";
import { Icon } from "@iconify/react";
import moment from "moment";

//Component
import Timepicker from "../Common/Timepicker";
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation } from "urql";
import { ADD_COUPON } from "@/Urql/Query/Coupons/coupon.query";
import { AddCouponData } from "@/Urql/Types/Coupons/coupon.types";

interface Inputs {
    name: string;
    code: string;
    discount: string;
    discountUnit: string;
    minimumPurchase: string;
    expires: DateValueType;
    time: string;
}
const Create = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<AddCouponData>(ADD_COUPON);

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<Inputs>();

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const { time, ...rest } = value;
        const formData = {
            ...rest,
            expires: moment(`${value.expires?.endDate} ${time}`, "YYYY-MM-DD h:mm A").format("YYYY-MM-DD HH:mm:ss.SSSSSSZ")
        }
        mutate({ couponInput: formData }).then(({ data }) => {
            setNotification(true)
            if (data?.addCoupon.success) {
                reset()
            }
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
                {error?.message ?? data?.addCoupon.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Create new coupon</h6>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Fill the form</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="name" className="col-span-1 w-max">Coupon name</label>
                        <div className="col-span-3">
                            <Input
                                label="Coupon name"
                                id="name"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("name", { required: true })}
                                error={errors.name ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="code" className="col-span-1 w-max">Coupon code</label>
                        <div className="col-span-3">
                            <Input
                                label="Coupon code"
                                id="code"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("code", { required: true })}
                                error={errors.code ? true : false}
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
                        <label htmlFor="purchase" className="col-span-1 w-max">Min Purchase</label>
                        <div className="col-span-3">
                            <Input
                                label="Min Purchase"
                                id="purchase"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("minimumPurchase", { required: true })}
                                error={errors.minimumPurchase ? true : false}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
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
                                        minDate={new Date()}
                                        customInput={
                                            <Input
                                                label="Expire time"
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
                        <label htmlFor="expires" className="col-span-1 w-max">Expire time</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="time"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Timepicker
                                        label="Expires time"
                                        value={value}
                                        onChange={onChange}
                                        error={errors.time ? true : false}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Add coupon</span>
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

export default Create;