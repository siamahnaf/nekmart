import { useState } from "react";
import { Input, Select, Option, Switch } from "@material-tailwind/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Icon } from "@iconify/react";

//Component
import CustomSelect from "@/Components/Common/CustomSelect";
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { ADD_SECTION, GET_SECTIONS } from "@/Urql/Query/Home/section.query";
import { AddSectionData, GetSectionsData } from "@/Urql/Types/Home/section.types";
import { GET_MAIN_CATEGORIES } from "@/Urql/Query/RootCategories/root.query";
import { GetMainCategoriesData } from "@/Urql/Types/RootCategories/root.types";

interface Inputs {
    name: string;
    base: string;
    description: string;
    category: string;
    publish: boolean;
}
const Add = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    //Urql
    const [{ data: mainCategory }] = useQuery<GetMainCategoriesData>({ query: GET_MAIN_CATEGORIES, variables: { searchInput: { limit: 20, page: 1, search: search } }, requestPolicy: "cache-and-network" })
    const [{ data, error, fetching }, mutate] = useMutation<AddSectionData>(ADD_SECTION);
    const [_, refetch] = useQuery<GetSectionsData>({ query: GET_SECTIONS });

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        watch
    } = useForm<Inputs>();

    //Form data
    const base = watch().base;

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ sectionInput: value }).then(({ data }) => {
            setNotification(true)
            if (data?.addSection.success) {
                reset()
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
                {error?.message ?? data?.addSection.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Create new section</h6>
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
                        <label htmlFor="description" className="col-span-1 w-max">Short Description</label>
                        <div className="col-span-3">
                            <Input
                                label="Description"
                                id="description"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("description", { required: true })}
                                error={errors.description ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="base" className="col-span-1 w-max">Base</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="base"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        label="Select Base"
                                        color="red"
                                        error={errors.base ? true : false}
                                        value={value}
                                        onChange={e => onChange(e)}
                                        id="base"
                                    >
                                        <Option value="category">Category</Option>
                                        <Option value="latest">Latest Product</Option>
                                        <Option value="sale">Sale Product</Option>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                    {base === "category" &&
                        <div className="grid grid-cols-4 gap-2 items-start mb-7">
                            <label htmlFor="category" className="col-span-1 w-max">Category</label>
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
                                            options={mainCategory?.getMainCategories.results.map((item) => ({ label: item.name, value: item.id }))}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    }
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="publish" className="col-span-1 w-max">Publish</label>
                        <div className="col-span-3">
                            <Switch
                                color="red"
                                crossOrigin="anonymous"
                                {...register("publish")}
                            />
                        </div>
                    </div>
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-5 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Add Section</span>
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