import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Icon } from "@iconify/react";

//Component
import CustomSelect from "../Common/CustomSelect";
import MultiSelect from "../Common/MultiSelect";
import { Notification } from "../Common/Notification";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_RUNNING_FLASH, UPDATE_FLASH_PRODUCT, GET_NO_FLASH_PRODUCT } from "@/Urql/Query/Campaign/flash.query";
import { GetRunningFlashData, UpdateFlashProduct, GetNoFlashProduct } from "@/Urql/Types/Campaign/flash.types";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";
import { GetSellerProfileData } from "@/Urql/Types/Authentication/profile.types";

interface Inputs {
    flashId: string;
    productIds: { label: string, value: string }[];
}

const Create = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);
    const [flashSearch, setFlashSearch] = useState<string>("");
    const [productSearch, setProductSearch] = useState<string>("");

    //Urql
    const [{ data: profile }] = useQuery<GetSellerProfileData>({ query: GET_SELLER_PROFILE });

    const [{ data: flashData, fetching: flashFetching }] = useQuery<GetRunningFlashData>({ query: GET_RUNNING_FLASH, variables: { searchInput: { page: 1, limit: 20, search: productSearch } } });

    const [{ data: productData, fetching: productFetching }, refetch] = useQuery<GetNoFlashProduct>({ query: GET_NO_FLASH_PRODUCT, variables: { searchInput: { page: 1, limit: 20, search: flashSearch }, sellerId: profile?.getSellerProfile.id } });

    const [{ data, error, fetching }, mutate] = useMutation<UpdateFlashProduct>(UPDATE_FLASH_PRODUCT);

    //Form Initializing
    const {
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm<Inputs>();

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const formData = {
            flashId: value.flashId,
            productIds: value.productIds.map(item => item.value)
        }
        mutate({ updateFlashProductInput: formData }).then(({ data }) => {
            setNotification(true)
            if (data?.updateFlashProduct.success) {
                reset()
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification(true)
        })
    };

    return (
        <div>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.updateFlashProduct.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Add product to campaign</h6>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Fill the form</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="campaign" className="col-span-1 w-max text-[15px]">Select Campaign</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="flashId"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <CustomSelect
                                        value={value}
                                        onChange={onChange}
                                        label="Select Flash"
                                        error={errors.flashId ? true : false}
                                        fetching={flashFetching}
                                        search={
                                            <div className="mb-2 relative">
                                                <input
                                                    className="py-2 pl-9 pr-3 rounded-md border border-solid border-gray-200 focus:outline-none w-full"
                                                    placeholder="Search category"
                                                    onChange={(e) => setFlashSearch(e.target.value)}
                                                />
                                                <Icon icon="gala:search" className="absolute left-2 top-1/2 -translate-y-1/2 text-lg text-blue-gray-900" />
                                            </div>
                                        }
                                        options={flashData?.getRunningFlashes.results.map((item) => ({ label: item.title, value: item.id }))}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="product" className="col-span-1 w-max text-[15px]">Select Products</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="productIds"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <MultiSelect
                                        value={value}
                                        onChange={onChange}
                                        label="Select Product"
                                        key="product"
                                        error={errors.productIds ? true : false}
                                        fetching={productFetching}
                                        search={
                                            <div className="mb-2 relative">
                                                <input
                                                    className="py-2 pl-9 pr-3 rounded-md border border-solid border-gray-200 focus:outline-none w-full"
                                                    placeholder="Search main category"
                                                    onChange={(e) => setProductSearch(e.target.value)}
                                                />
                                                <Icon icon="gala:search" className="absolute left-2 top-1/2 -translate-y-1/2 text-lg text-blue-gray-900" />
                                            </div>
                                        }
                                        options={productData?.getNoFlashProduct.results.map((item) => ({ label: item.name, value: item.id })).filter(option => !value?.some(sel => sel.value === option.value))}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Save Products</span>
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