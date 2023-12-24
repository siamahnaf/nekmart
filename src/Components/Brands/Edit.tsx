import { useState } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

//Component
import ImageUploader from "../Common/ImageUploader";
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_SINGLE_BRAND, UPDATE_BRAND } from "@/Urql/Query/Brand/brand.query";
import { GetSingleBrandData, UpdateBrandData } from "@/Urql/Types/Brand/brand.types";

interface Inputs {
    name: string;
    description: string;
    image: string
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
    const [{ data: brandData }, refetch] = useQuery<GetSingleBrandData>({ query: GET_SINGLE_BRAND, variables: { getBrandId: id } })
    const [{ data, error, fetching }, mutate] = useMutation<UpdateBrandData>(UPDATE_BRAND);

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<Inputs>({
        defaultValues: {
            name: brandData?.getBrand.name,
            image: brandData?.getBrand.image,
            description: brandData?.getBrand.description
        }
    });

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ brandInput: value, updateBrandId: id }).then(() => {
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
                {error?.message ?? data?.updateBrand.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Create new brand</h6>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Fill the form</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="name" className="col-span-1 w-max">Brand name</label>
                        <div className="col-span-3">
                            <Input
                                label="Brand name"
                                id="name"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("name", { required: true })}
                                error={errors.name ? true : false}
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
                    <ImageUploader
                        label="Image"
                        width={300}
                        height={300}
                        onChange={(e) => setValue("image", e)}
                        is_multiple={false}
                        folderName="Brands"
                        value={watch("image")}
                    />
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Update brand</span>
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