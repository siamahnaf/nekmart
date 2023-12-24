import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Component
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation } from "urql";
import { UPDATE_PASSWORD } from "@/Urql/Query/Authentication/profile.query";
import { UpdatePasswordData } from "@/Urql/Types/Authentication/profile.types";

interface Inputs {
    oldPassword: string;
    newPassword: string;
    newConfirm: string;
}
const UpdatePassword = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<UpdatePasswordData>(UPDATE_PASSWORD);

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<Inputs>();

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const { newConfirm, ...rest } = value
        mutate({ changePasswordInput: rest }).then(({ data }) => {
            setNotification(true)
            if (data?.changePassword.success) {
                reset()
            }
        }).catch(() => {
            setNotification(true)
        })
    }

    return (
        <div className="mb-10">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.changePassword.message}
            </Notification>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Change your password</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="old" className="col-span-1 w-max">Old Password</label>
                        <div className="col-span-3">
                            <Input
                                label="Old Password"
                                id="old"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("oldPassword", { required: true })}
                                error={errors.oldPassword ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="new" className="col-span-1 w-max">New Password</label>
                        <div className="col-span-3">
                            <Input
                                label="New Password"
                                id="new"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("newPassword", { required: true })}
                                error={errors.newPassword ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="confirm" className="col-span-1 w-max">Confirm Password</label>
                        <div className="col-span-3">
                            <Input
                                label="Confirm Password"
                                id="confirm"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("newConfirm", {
                                    required: true,
                                    validate: (value: string) => {
                                        if (watch("newPassword") === value) return true;
                                        return false;
                                    }
                                })}
                                error={errors.newConfirm ? true : false}
                            />
                        </div>
                    </div>
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-4 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Change password</span>
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

export default UpdatePassword;