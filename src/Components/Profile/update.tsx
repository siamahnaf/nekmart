import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Component
import ImageUploader from "../Common/ImageUploader";
import { Notification } from "../Common/Notification";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GetProfileData } from "@/Urql/Types/Authentication/auth.types";
import { UPDATE_PROFILE } from "@/Urql/Query/Authentication/profile.query";
import { UpdateProfileData } from "@/Urql/Types/Authentication/profile.types";

interface Inputs {
    name: string;
    email: string;
    avatar: string;
}
const UpdateProfile = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data: profileData }] = useQuery<GetProfileData>({ query: GET_PROFILE });
    const [{ data, error, fetching }, mutate] = useMutation<UpdateProfileData>(UPDATE_PROFILE);

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<Inputs>({
        defaultValues: {
            name: profileData?.getProfile.name,
            email: profileData?.getProfile.email,
            avatar: profileData?.getProfile.avatar
        }
    });

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ updateUserInput: value }).then(() => {
            setNotification(true)
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
                {error?.message ?? data?.updateProfile.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Manage Profile</h6>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Basic Information</h4>
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
                    <ImageUploader
                        label="Profile Picture"
                        width={400}
                        height={400}
                        onChange={(e) => setValue("avatar", e)}
                        is_multiple={false}
                        folderName="Profile"
                        value={watch("avatar")}
                        className="mb-7"
                    />
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="email" className="col-span-1 w-max">Your Email</label>
                        <div className="col-span-3">
                            <Input
                                label="Email"
                                id="email"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("email", { required: true })}
                                error={errors.email ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="phone" className="col-span-1 w-max">Phone Number</label>
                        <div className="col-span-3">
                            <Input
                                label="Phone"
                                id="phone"
                                color="red"
                                crossOrigin="anonymous"
                                readOnly
                                defaultValue={profileData?.getProfile.phone}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="role" className="col-span-1 w-max">Your Role</label>
                        <div className="col-span-3">
                            <Input
                                label="Role"
                                id="role"
                                color="red"
                                crossOrigin="anonymous"
                                readOnly
                                defaultValue={profileData?.getProfile.role}
                            />
                        </div>
                    </div>
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-4 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Update profile</span>
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

export default UpdateProfile;