import { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, Select, Option } from "@material-tailwind/react";

//Component
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { ADD_ADMIN, GET_ADMINS } from "@/Urql/Query/Authentication/user.query";
import { AddAdminData, GetAdminData } from "@/Urql/Types/Authentication/user.types";

//interface
interface Inputs {
    name: string;
    phone: string;
    email: string;
    password: string;
    role: string;
}
const Add = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<AddAdminData>(ADD_ADMIN);
    const [{ }, refetch] = useQuery<GetAdminData>({ query: GET_ADMINS, variables: { searchInput: { limit: 20, page: 1 } } });

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<Inputs>();

    //On Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ adminInput: value }).then(({ data }) => {
            setNotification(true)
            if (data?.addAdmins.success) {
                reset()
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification(true)
        })
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.addAdmins.message}
            </Notification>
            <h5 className="font-bold text-lg mb-5">Add Editor or Moderator</h5>
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
                        <label htmlFor="phone" className="col-span-1 w-max">Phone</label>
                        <div className="col-span-3">
                            <Input
                                label="Phone"
                                id="phone"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("phone", {
                                    required: true,
                                    pattern: /^880\d{10}$/
                                })}
                                error={errors.phone ? true : false}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="email" className="col-span-1 w-max">Email</label>
                        <div className="col-span-3">
                            <Input
                                label="Email"
                                id="email"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("email", {
                                    pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
                                })}
                                error={errors.phone ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="password" className="col-span-1 w-max">Password</label>
                        <div className="col-span-3">
                            <Input
                                label="Password"
                                id="password"
                                color="red"
                                type="password"
                                crossOrigin="anonymous"
                                {...register("password", { required: true })}
                                error={errors.password ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="role" className="col-span-1 w-max">Select role</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="role"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        label="Role"
                                        color="red"
                                        error={errors.role ? true : false}
                                        value={value}
                                        onChange={e => onChange(e)}
                                        id="role"
                                    >
                                        <Option value="editor">Editor</Option>
                                        <Option value="moderator">Moderator</Option>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Add User</span>
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