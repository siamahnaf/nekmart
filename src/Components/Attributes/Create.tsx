import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

//Component
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation } from "urql";
import { ADD_ATTRIBUTE } from "@/Urql/Query/Attribute/attribute.query";
import { AddAttributeData } from "@/Urql/Types/Attribute/attribute.types";

//Interface
interface Values {
    value: string;
    meta: string;
}
interface Inputs {
    name: string;
    values: Values[];
}

const Create = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<AddAttributeData>(ADD_ATTRIBUTE);

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<Inputs>({
        defaultValues: {
            values: [{ value: "", meta: "" }]
        }
    });

    //Use Field array
    const { fields, append, remove } = useFieldArray({
        control,
        name: "values"
    });

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ attributeInput: value }).then(() => {
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
                {error?.message ?? data?.addAttribute.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Create new attribute</h6>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Fill the form</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="name" className="col-span-1 w-max">Attribute name</label>
                        <div className="col-span-3">
                            <Input
                                label="Attribute name"
                                id="name"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("name", { required: true })}
                                error={errors.name ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="description" className="col-span-1 w-max">Attribute Values</label>
                        <div className="col-span-3">
                            {fields.map((_, i) => (
                                <div key={i} className="grid grid-cols-12 gap-5">
                                    <div className="col-span-5">
                                        <label className="text-sm mb-2 block">Value</label>
                                        <Input
                                            label="Value"
                                            id="value"
                                            color="red"
                                            crossOrigin="anonymous"
                                            {...register(`values.${i}.value`, { required: true })}
                                            error={errors.values?.[i]?.value ? true : false}
                                        />
                                    </div>
                                    <div className="col-span-5">
                                        <label className="text-sm mb-2 block">Meta</label>
                                        <Input
                                            label="Meta"
                                            id="meta"
                                            color="red"
                                            crossOrigin="anonymous"
                                            {...register(`values.${i}.meta`, { required: true })}
                                            error={errors.values?.[i]?.meta ? true : false}
                                        />
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center">
                                        <button onClick={() => remove(i)} className="text-main text-sm mt-7 opacity-70 font-semibold" type="button" disabled={fields.length === 1}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-5">
                                <button className="bg-black text-sm text-white px-5 py-2 rounded-md uppercase font-semibold" type="button" onClick={() => append({ value: "", meta: "" })}>
                                    Add More
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Add Attribute</span>
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