import { useContext, useState, ChangeEvent } from "react";
import { Input, Switch } from "@material-tailwind/react";
import { Controller } from "react-hook-form";
import { Icon } from "@iconify/react";

//Components
import CustomSelect from "@/Components/Common/CustomSelect";
import MultiSelect from "@/Components/Common/MultiSelect";
import InputDrop from "@/Components/Common/InputDrop";

//Context
import { productContext } from "@/Context/product.context";

//Urql
import { useQuery } from "urql";
import { GET_MAIN_CATEGORY, GET_CATEGORY, GET_SUB_CATEGORY } from "@/Urql/Query/Category/category.query";
import { GetMainCategoryData, GetCategoryData, GetSubCategoryData } from "@/Urql/Types/Category/category.types";
import { GET_BRAND } from "@/Urql/Query/Brand/brand.query";
import { GetBrandData } from "@/Urql/Types/Brand/brand.types";
import { GET_TAGS } from "@/Urql/Query/Tags/tag.query";
import { GetTagData } from "@/Urql/Types/Tags/tag.types";

const ProductInformation = () => {
    //State
    const [mainSearch, setMainSearch] = useState<string>("");
    const [categorySearch, setCategorySearch] = useState<string>("");
    const [subSearch, setSubSearch] = useState<string>("");
    const [brandSearch, setBrandSearch] = useState<string>("");
    const [tagSearch, setTagSearch] = useState<string>("");

    //Context
    const { register, errors, control } = useContext(productContext);

    //Urql
    const [{ data: mainCategory, fetching: mainCategoryFetching }] = useQuery<GetMainCategoryData>({ query: GET_MAIN_CATEGORY, variables: { searchInput: { page: 1, limit: 20, search: mainSearch } } });

    const [{ data: category, fetching: categoryFetching }] = useQuery<GetCategoryData>({ query: GET_CATEGORY, variables: { searchInput: { page: 1, limit: 20, search: categorySearch } } });

    const [{ data: subData, fetching: subFetching }] = useQuery<GetSubCategoryData>({ query: GET_SUB_CATEGORY, variables: { searchInput: { page: 1, limit: 20, search: subSearch } } });

    const [{ data: brand, fetching: brandFetching }] = useQuery<GetBrandData>({ query: GET_BRAND, variables: { searchInput: { page: 1, limit: 20, search: brandSearch } } });

    const [{ data: tagData, fetching: tagFetching }] = useQuery<GetTagData>({ query: GET_TAGS, variables: { searchInput: { page: 1, limit: 20, search: tagSearch } } });

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Information</h4>
            <div className="p-5">
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="name" className="col-span-1 w-max text-sm">Product Name</label>
                    <div className="col-span-3">
                        <Input
                            label="Name"
                            id="name"
                            color="red"
                            crossOrigin="anonymous"
                            {...register?.("name", { required: true })}
                            error={errors?.name ? true : false}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="mainCategory" className="col-span-1 w-max text-sm">Main Category</label>
                    <div className="col-span-3">
                        <Controller
                            control={control}
                            name="main_category"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <CustomSelect
                                    value={value}
                                    onChange={onChange}
                                    label="Main Category"
                                    fetching={mainCategoryFetching}
                                    error={errors?.main_category ? true : false}
                                    search={
                                        <div className="mb-2 relative">
                                            <input
                                                className="py-2 pl-9 pr-3 rounded-md border border-solid border-gray-200 focus:outline-none w-full"
                                                placeholder="Search main category"
                                                onChange={(e) => setMainSearch(e.target.value)}
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
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="category" className="col-span-1 w-max text-sm">Category</label>
                    <div className="col-span-3">
                        <Controller
                            control={control}
                            name="category"
                            render={({ field: { onChange, value } }) => (
                                <CustomSelect
                                    value={value}
                                    onChange={onChange}
                                    label="Category"
                                    fetching={categoryFetching}
                                    search={
                                        <div className="mb-2 relative">
                                            <input
                                                className="py-2 pl-9 pr-3 rounded-md border border-solid border-gray-200 focus:outline-none w-full"
                                                placeholder="Search category"
                                                onChange={(e) => setCategorySearch(e.target.value)}
                                            />
                                            <Icon icon="gala:search" className="absolute left-2 top-1/2 -translate-y-1/2 text-lg text-blue-gray-900" />
                                        </div>
                                    }
                                    options={category?.getCategories.results.map((item) => ({ label: item.name, value: item.id }))}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="subCategory" className="col-span-1 w-max text-sm">Sub Category</label>
                    <div className="col-span-3">
                        <Controller
                            control={control}
                            name="sub_category"
                            render={({ field: { onChange, value } }) => (
                                <MultiSelect
                                    value={value}
                                    onChange={onChange}
                                    label="Sub Category"
                                    key="subCategory"
                                    fetching={subFetching}
                                    search={
                                        <div className="mb-2 relative">
                                            <input
                                                className="py-2 pl-9 pr-3 rounded-md border border-solid border-gray-200 focus:outline-none w-full"
                                                placeholder="Search main category"
                                                onChange={(e) => setSubSearch(e.target.value)}
                                            />
                                            <Icon icon="gala:search" className="absolute left-2 top-1/2 -translate-y-1/2 text-lg text-blue-gray-900" />
                                        </div>
                                    }
                                    options={subData?.getSubCategories.results.map((item) => ({ label: item.name, value: item.id })).filter(option => !value?.some(sel => sel.value === option.value))}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="category" className="col-span-1 w-max text-sm">Brand</label>
                    <div className="col-span-3">
                        <Controller
                            control={control}
                            name="brand"
                            render={({ field: { onChange, value } }) => (
                                <CustomSelect
                                    value={value}
                                    onChange={onChange}
                                    label="Brand"
                                    fetching={brandFetching}
                                    search={
                                        <div className="mb-2 relative">
                                            <input
                                                className="py-2 pl-9 pr-3 rounded-md border border-solid border-gray-200 focus:outline-none w-full"
                                                placeholder="Search brand"
                                                onChange={(e) => setBrandSearch(e.target.value)}
                                            />
                                            <Icon icon="gala:search" className="absolute left-2 top-1/2 -translate-y-1/2 text-lg text-blue-gray-900" />
                                        </div>
                                    }
                                    options={brand?.getBrands.results.map((item) => ({ label: item.name, value: item.id }))}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="unit" className="col-span-1 w-max text-sm">Unit</label>
                    <div className="col-span-3">
                        <Input
                            label="Unit"
                            id="unit"
                            color="red"
                            crossOrigin="anonymous"
                            {...register?.("unit")}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="minPurchase" className="col-span-1 w-max text-sm">Minimum Purchase Qty</label>
                    <div className="col-span-3">
                        <Input
                            label="Minimum Purchase Quantity"
                            id="minPurchase"
                            color="red"
                            crossOrigin="anonymous"
                            {...register?.("minPurchase")}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="tag" className="col-span-1 w-max text-sm">Tags</label>
                    <div className="col-span-3">
                        <Controller
                            control={control}
                            name="tag"
                            render={({ field: { onChange, value } }) => (
                                <MultiSelect
                                    value={value}
                                    onChange={onChange}
                                    label="Tags"
                                    key="tags"
                                    fetching={tagFetching}
                                    search={
                                        <div className="mb-2 relative">
                                            <input
                                                className="py-2 pl-9 pr-3 rounded-md border border-solid border-gray-200 focus:outline-none w-full"
                                                placeholder="Search main category"
                                                onChange={(e) => setTagSearch(e.target.value)}
                                            />
                                            <Icon icon="gala:search" className="absolute left-2 top-1/2 -translate-y-1/2 text-lg text-blue-gray-900" />
                                        </div>
                                    }
                                    options={tagData?.getTags.results.map((item) => ({ label: item.name, value: item.id })).filter(option => !value?.some(sel => sel.value === option.value))}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="estimate" className="col-span-1 w-max text-sm">
                        <p>Estimate Delivery</p>
                        <span className="text-xs">(In Days)</span>
                    </label>
                    <div className="col-span-3">
                        <Input
                            label="Estimate Delivery"
                            id="estimateDelivery"
                            color="red"
                            crossOrigin="anonymous"
                            {...register?.("estimateDelivery")}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="warranty" className="col-span-1 w-max text-sm">Warranty</label>
                    <div className="col-span-3">
                        <Controller
                            control={control}
                            name="warranty"
                            render={({ field: { onChange, value } }) => (
                                <InputDrop
                                    options={["year", "month", "day"]}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="refundAble" className="col-span-1 w-max text-sm">Refundable</label>
                    <div className="col-span-3">
                        <Switch
                            crossOrigin="anonymous"
                            {...register?.("refundAble")}
                            color="red"
                            id="refundAble"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInformation;