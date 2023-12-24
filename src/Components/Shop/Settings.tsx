import { useState } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Component
import ImageUploader from "../Common/ImageUploader";
import { Notification } from "../Common/Notification";

//Urql
import { useMutation, useQuery } from "urql";
import { UPDATE_SELLER, GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";
import { UpdateSellerData, GetSellerProfileData } from "@/Urql/Types/Authentication/profile.types";

interface Inputs {
    shopName: string;
    phone: string;
    logo: string;
    banner: string;
    address: string;
    metaTitle: string;
    metaDescription: string;
}
const Settings = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data: profile }, refetch] = useQuery<GetSellerProfileData>({ query: GET_SELLER_PROFILE });
    const [{ data, error, fetching }, mutate] = useMutation<UpdateSellerData>(UPDATE_SELLER);

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<Inputs>({
        defaultValues: {
            shopName: profile?.getSellerProfile.shopName,
            phone: profile?.getSellerProfile.phone,
            logo: profile?.getSellerProfile.logo,
            banner: profile?.getSellerProfile.banner,
            address: profile?.getSellerProfile.address,
            metaTitle: profile?.getSellerProfile.metaTitle,
            metaDescription: profile?.getSellerProfile.metaDescription
        }
    });

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ updateSellerInput: value, updateSellerId: profile?.getSellerProfile.id }).then(({ data }) => {
            setNotification(true)
            if (data?.updateSeller.success) {
                refetch({ requestPolicy: "network-only" })
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
                {error?.message ?? data?.updateSeller.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Shop Settings</h6>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Basic Information</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="name" className="col-span-1 w-max">Shop name</label>
                        <div className="col-span-3">
                            <Input
                                label="Shop name"
                                id="name"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("shopName", { required: true })}
                                error={errors.shopName ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="phone" className="col-span-1 text-sm">
                            <p>Phone</p>
                            <span className="text-xs">This is display phone number, not your account number</span>
                        </label>
                        <div className="col-span-3">
                            <Input
                                label="Phone number"
                                id="phone"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("phone", {
                                    required: true,
                                    pattern: /^880\d{10}$/
                                })}
                                error={errors.phone ? true : false}
                            />
                        </div>
                    </div>
                    <ImageUploader
                        label="Logo"
                        width={400}
                        height={400}
                        onChange={(e) => setValue("logo", e)}
                        is_multiple={false}
                        folderName="Seller"
                        value={watch("logo")}
                        className="mb-7"
                    />
                    <ImageUploader
                        label="Banner"
                        width={1600}
                        height={300}
                        onChange={(e) => setValue("banner", e)}
                        is_multiple={false}
                        folderName="Seller"
                        value={watch("banner")}
                        className="mb-7"
                    />
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="address" className="col-span-1 w-max">Address</label>
                        <div className="col-span-3">
                            <Textarea
                                label="Address"
                                id="address"
                                color="red"
                                {...register("address", { required: true })}
                                error={errors.address ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="metaTitle" className="col-span-1 w-max">Meta title</label>
                        <div className="col-span-3">
                            <Input
                                label="Meta title"
                                id="metaTitle"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("metaTitle")}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="metaDescription" className="col-span-1 w-max">Meta description</label>
                        <div className="col-span-3">
                            <Textarea
                                label="Description"
                                id="metaDescription"
                                color="red"
                                {...register("metaDescription")}
                            />
                        </div>
                    </div>
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Update Settings</span>
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

export default Settings;