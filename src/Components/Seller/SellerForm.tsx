import { useEffect, useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Textarea } from "@material-tailwind/react";

//Components
import Container from "../Common/Container";
import { Notification } from "../Common/Notifications";
import ImageUploader from "../Common/ImageUploader";
import SellerVerify from "./SellerVerify";

//Urql
import { useMutation } from "urql";
import { ADD_SELLER } from "@/Urql/Query/Seller/seller.query";
import { AddSellerData } from "@/Urql/Types/Seller/seller.types";

//Interface
interface Inputs {
    shopName: string;
    phone: string;
    password: string;
    logo: string;
    banner: string;
    address: string;
    metaTitle: string;
    metaDescription: string;
}

const SellerForm = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ error, fetching }, mutate] = useMutation<AddSellerData>(ADD_SELLER);

    //Initializing Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<Inputs>();

    //Submit Form
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const formData = {
            ...value,
            phone: "88" + value.phone
        }
        mutate({ sellerInput: formData }).then(({ error, data }) => {
            if (error) {
                setNotification(true)
            }
            if (data?.createSeller.success) {
                setOpen(true)
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
        register("logo", { required: true })
        register("banner", { required: true })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section>
            <Container className="py-12">
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    severity="error"
                >
                    {error?.message}
                </Notification>
                <h6 className="font-bold text-lg mb-8">Seller Registration</h6>
                <div className="border border-solid border-gray-200 rounded-md">
                    <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Fill the form</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                        <div className="grid grid-cols-4 gap-2 items-start mb-7">
                            <label htmlFor="name" className="col-span-1 w-max">Shop Name</label>
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
                            <label htmlFor="phone" className="col-span-1 w-max">Phone</label>
                            <div className="col-span-3">
                                <Input
                                    label="Phone"
                                    id="phone"
                                    color="red"
                                    crossOrigin="anonymous"
                                    {...register("phone", {
                                        required: true,
                                        pattern: /^0\d{10}$/
                                    })}
                                    error={errors.phone ? true : false}
                                    onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                    }}
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
                                    crossOrigin="anonymous"
                                    type="password"
                                    {...register("password", { required: true })}
                                    error={errors.password ? true : false}
                                />
                            </div>
                        </div>
                        <ImageUploader
                            label="Logo"
                            width={300}
                            height={300}
                            onChange={(e) => setValue("logo", e)}
                            is_multiple={false}
                            folderName="Seller"
                            value={watch("logo")}
                            className="mb-7"
                            error={errors.logo ? true : false}
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
                            error={errors.banner ? true : false}
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
                                    label="Meta description"
                                    id="metaDescription"
                                    color="red"
                                    {...register("metaDescription")}
                                />
                            </div>
                        </div>
                        <div className="text-right mt-8">
                            <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                                <span className={fetching ? "opacity-30" : "opacity-100"}>Register</span>
                                <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                    {fetching &&
                                        <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                    }
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
                <SellerVerify
                    open={open}
                    onClose={() => setOpen(false)}
                    data={watch()}
                />
            </Container>
        </section>
    );
};

export default SellerForm;