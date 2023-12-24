import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Input, Textarea } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/router";

//Components
import Container from "../Common/Container";
import { Notification } from "../Common/Notifications";
import ImagesUploader from "../Common/ImagesUploader";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { ADD_PRE_ORDER } from "@/Urql/Query/Preorder/preorder.query";
import { GetSettingsData } from "@/Urql/Types/Settings/settings.types";
import { AddPreOrderData } from "@/Urql/Types/Preorder/preorder.types";

//Interface
interface Inputs {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    email: string;
    productImage: string[];
    productUrl: { url: string }[];
}

const OrderForm = () => {
    //Initialize Hook
    const router = useRouter();

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data }] = useQuery<GetSettingsData>({ query: GET_SETTINGS });
    const [{ error, fetching }, mutate] = useMutation<AddPreOrderData>(ADD_PRE_ORDER);

    //Initialize Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        watch
    } = useForm<Inputs>({
        defaultValues: {
            productUrl: [{ url: "" }]
        }
    });

    //Field Array
    const { fields, append, remove } = useFieldArray({
        control,
        name: "productUrl" as never
    });

    //Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const formData = {
            ...value,
            productUrl: value.productUrl.map(item => item.url)
        }
        mutate({ preorderInput: formData }).then(({ error, data }) => {
            if (error) {
                setNotification(true)
            }
            if (data?.addPreorder.success) {
                router.push("/pre-order-confirm");
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
        <section>
            <Container className="py-6">
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    severity="error"
                >
                    {error?.message}
                </Notification>
                <div className="flex gap-2 items-center">
                    {data?.getSiteSettings.logo ? <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + data.getSiteSettings.logo} alt="Nekmart" width={540} height={120} className="w-[200px]" /> : <h4 className="text-2xl font-bold text-main">Nekmart</h4>}
                    <p className="text-3xl text-main font-semibold">Pre-Order Form</p>
                </div>
                <p className="text-sm mb-2 mt-4">
                    Pre-order করতে এই ফর্মটি পূরন করুন অথবা কোন প্রোডাক্টের সম্পর্কে জানতে আপনার সকল ইনফর্মেশন দিয়ে ফর্মটি পূরন করুন। এইখানে শুধু মাত্র UK এর সাইটের লিঙ্ক দিয়ে আমাদের সাজেষ্ট করতে পারবেন।
                </p>
                <p className="text-sm">
                    শর্তসমূহঃ <br />
                    ১। প্রি-অর্ডারের জন্যে ফুল পেমেন্ট আমাদের অগ্রীম বিকাশে অথবা ব্যাংকে দিতে হবে।<br />
                    ২। প্রি-অর্ডার করার প্রোডাক্ট ২১ কর্ম দিবসের মধ্য়ে ডেলিভারি করা হবে।<br />
                    ৩। কিছু কিছু প্রোডাক্টের জন্যে অফেরত যোগ্য অগ্রীম টাকা পেমেন্ট করতে হবে।<br />
                    ৪। নেকমার্ট যেকোন সময় প্রি-অর্ডার বাতিল করতে পারবে। সেক্ষেত্রে নেকমার্ট আপনার টাকা ফেরত দিতে বাধ্য থাকিবে।<br />
                    ৫। প্রি-অর্ডার কনফার্ম করার পর অর্ডারটি বাতিল করলে কোন টাকা রিফান্ড(ফেরত) করা হবে না।<br />
                </p>
                <div className="border border-solid border-gray-200 rounded-md mt-8">
                    <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Fill the form</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                        <div className="grid grid-cols-4 gap-2 items-start mb-7">
                            <label htmlFor="firstName" className="col-span-1 w-max">First Name</label>
                            <div className="col-span-3">
                                <Input
                                    label="First Name"
                                    id="firstName"
                                    color="red"
                                    crossOrigin="anonymous"
                                    {...register("firstName", { required: true })}
                                    error={errors.firstName ? true : false}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 items-start mb-7">
                            <label htmlFor="lastName" className="col-span-1 w-max">Last Name</label>
                            <div className="col-span-3">
                                <Input
                                    label="Last Name"
                                    id="lastName"
                                    color="red"
                                    crossOrigin="anonymous"
                                    {...register("lastName", { required: true })}
                                    error={errors.lastName ? true : false}
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
                            <label htmlFor="email" className="col-span-1 w-max">Email</label>
                            <div className="col-span-3">
                                <Input
                                    label="Email"
                                    id="email"
                                    color="red"
                                    crossOrigin="anonymous"
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                    })}
                                />
                            </div>
                        </div>
                        <ImagesUploader
                            label="Product Image"
                            size={5}
                            onChange={(e) => setValue?.("productImage", e)}
                            folderName="Pre Order"
                            value={watch?.("productImage")}
                            className="mb-7"
                        />
                        <div className="grid grid-cols-4 gap-2 items-start mb-7">
                            <label htmlFor="productUrl" className="col-span-1 w-max">Product url</label>
                            <div className="col-span-3">
                                {fields.map((_, i) => (
                                    <div key={i} className="flex gap-3 mb-7">
                                        <Input
                                            label="Url"
                                            id="productUrl"
                                            color="red"
                                            crossOrigin="anonymous"
                                            {...register(`productUrl.${i}.url`, { required: true })}
                                        />
                                        <button className={`text-main text-sm ${fields.length <= 1 && "opacity-50"}`} disabled={fields.length <= 1} onClick={() => remove(i)} type="button">
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <div className="mt-2">
                                    <button onClick={() => append({ url: "" })} className="border border-solid border-main text-main py-1.5 px-2 text-sm rounded-md font-medium" type="button">
                                        Add more
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="text-right mt-8">
                            <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                                <span className={fetching ? "opacity-30" : "opacity-100"}>Submit</span>
                                <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                    {fetching &&
                                        <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                    }
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default OrderForm;