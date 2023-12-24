import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Icon } from "@iconify/react";

//Component
import ImageUploader from "../Common/ImageUploader";
import { Notification } from "../Common/Notifications";
import CustomSelect from "../Common/CustomSelect";

//Urql
import { useMutation, useQuery } from "urql";
import { ADD_SUB_CATEGORY } from "@/Urql/Query/SubCategories/sub.query";
import { AddSubCategoryData } from "@/Urql/Types/SubCategories/sub.types";
import { GET_CATEGORIES } from "@/Urql/Query/Categories/category.query";
import { GetCategoriesData } from "@/Urql/Types/Categories/category.types";

interface Inputs {
    name: string;
    category: string;
    image: string;
}
const Create = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    //Urql
    const [{ data: categoryData, error: categoryError }] = useQuery<GetCategoriesData>({ query: GET_CATEGORIES, variables: { searchInput: { search: search, page: 1, limit: 20 } } });
    const [{ data, error, fetching }, mutate] = useMutation<AddSubCategoryData>(ADD_SUB_CATEGORY);

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        control
    } = useForm<Inputs>();

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ subCategoryInput: value }).then(() => {
            setNotification(true)
            reset()
            setSearch("")
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
                {error?.message ?? data?.addSubCategory.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Create new category</h6>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Fill the form</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="name" className="col-span-1 w-max">Category name</label>
                        <div className="col-span-3">
                            <Input
                                label="Category name"
                                id="name"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("name", { required: true })}
                                error={errors.name ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="description" className="col-span-1 w-max">Category</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="category"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <CustomSelect
                                        value={value}
                                        onChange={onChange}
                                        label="Category"
                                        search={
                                            <div className="mb-2 relative">
                                                <input
                                                    className="py-2 pl-9 pr-3 rounded-md border border-solid border-gray-200 focus:outline-none w-full"
                                                    placeholder="Search main category"
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                                <Icon icon="gala:search" className="absolute left-2 top-1/2 -translate-y-1/2 text-lg text-blue-gray-900" />
                                            </div>
                                        }
                                        options={categoryData?.getCategories.results.map((item) => ({ label: item.name, value: item.id }))}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <ImageUploader
                        label="Image"
                        width={300}
                        height={300}
                        onChange={(e) => setValue("image", e)}
                        is_multiple={false}
                        folderName="Categories"
                        value={watch("image")}
                    />
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Add Category</span>
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