import { useState, ChangeEvent } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Component
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation } from "urql";
import { ADD_SHIPPING } from "@/Urql/Query/Shippings/shipping.query";
import { AddShippingData } from "@/Urql/Types/Shippings/shipping.types";

interface Inputs {
    name: string;
    rateInsideDhaka: string;
    rateOutsideDhaka: string;
    rateInSavar: string;
    estimateDelivery: string;
    description: string;
}
const Create = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<AddShippingData>(ADD_SHIPPING);

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>();

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ shippingInput: value }).then(() => {
            setNotification(true)
            reset()
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
                {error?.message ?? data?.addShipping.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Create new shipping</h6>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Fill the form</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="name" className="col-span-1 w-max">Shipping Name</label>
                        <div className="col-span-3">
                            <Input
                                label="Shipping name"
                                id="name"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("name", { required: true })}
                                error={errors.name ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="inDhaka" className="col-span-1 w-max">
                            <p>Shipping Rate</p>
                            <span className="text-[13px]">(Inside Dhaka)</span>
                        </label>
                        <div className="col-span-3">
                            <Input
                                label="Shipping Rate"
                                id="inDhaka"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("rateInsideDhaka", { required: true })}
                                error={errors.rateInsideDhaka ? true : false}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="outDhaka" className="col-span-1 w-max">
                            <p>Shipping Rate</p>
                            <span className="text-[13px]">(Outside Dhaka)</span>
                        </label>
                        <div className="col-span-3">
                            <Input
                                label="Shipping Rate"
                                id="outDhaka"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("rateOutsideDhaka", { required: true })}
                                error={errors.rateOutsideDhaka ? true : false}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="savar" className="col-span-1 w-max">
                            <p>Shipping Rate</p>
                            <span className="text-[13px]">(In Savar)</span>
                        </label>
                        <div className="col-span-3">
                            <Input
                                label="Shipping Rate"
                                id="savar"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("rateInSavar", { required: true })}
                                error={errors.rateInSavar ? true : false}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="estimate" className="col-span-1 w-max">
                            <p>Estimate Delivery</p>
                            <span className="text-[13px]">(In Days)</span>
                        </label>
                        <div className="col-span-3">
                            <Input
                                label="Estimate Delivery"
                                id="estimate"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("estimateDelivery", { required: true })}
                                error={errors.estimateDelivery ? true : false}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="description" className="col-span-1 w-max">Description</label>
                        <div className="col-span-3">
                            <Textarea
                                label="Description"
                                id="description"
                                color="red"
                                {...register("description")}
                            />
                        </div>
                    </div>
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Add shipping</span>
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