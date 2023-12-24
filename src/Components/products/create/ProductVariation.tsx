import { useState, useContext, useEffect, ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import { Icon } from "@iconify/react";

//Components
import MultiSelect from "@/Components/Common/MultiSelect";
import ImageUploader from "@/Components/Common/ImageUploader";

//Context
import { productContext, Inputs } from "@/Context/product.context";

//Urql
import { useQuery } from "urql";
import { GET_ATTRIBUTES } from "@/Urql/Query/Attributes/attribute.query";
import { GetAttributesData } from "@/Urql/Types/Attributes/attribute.types";

const ProductVariation = () => {
    //State
    const [search, setSearch] = useState<string>("");

    //Context
    const { control, watch, setValue, register, errors } = useContext(productContext);

    //Data
    const attributes = watch?.()?.attributes;

    //Urql
    const [{ data, fetching }] = useQuery<GetAttributesData>({ query: GET_ATTRIBUTES, variables: { searchInput: { search: search, limit: 20, page: 1 } } });

    //Generated Function
    const generateCombinations = () => {
        const combinations: Inputs["attributes"]["attributes"] = [];
        function generateHelper(current: any, index: number) {
            if (index === attributes?.selectedVariant?.length) {
                combinations.push({
                    variant: current.join('-'),
                    price: '',
                    quantity: '',
                    image: '',
                });
                return;
            }
            const selected = attributes?.selectedVariant?.[index].selected;
            if (selected) {
                for (const option of selected) {
                    const newCurrent = [...current, option.value];
                    generateHelper(newCurrent, index + 1);
                }
            }
        }
        generateHelper([], 0);
        setValue?.("attributes.attributes", combinations);
    };

    const generateVariant = () => {
        if (attributes && attributes?.attributeIds?.length > 0) {
            const variant = attributes?.attributeIds.map((item) => {
                return {
                    id: item.value,
                    selected: []
                }
            });
            setValue?.("attributes.selectedVariant", variant as Inputs["attributes"]["selectedVariant"]);
        } else {
            setValue?.("attributes", {} as Inputs["attributes"])
        }
    }

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Variation</h4>
            <div className="p-5">
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="attribute" className="col-span-1 w-max text-sm">Attributes</label>
                    <div className="col-span-3">
                        <Controller
                            control={control}
                            name="attributes.attributeIds"
                            render={({ field: { onChange, value } }) => (
                                <MultiSelect
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        generateVariant()
                                        generateCombinations()
                                    }}
                                    label="Attribute"
                                    fetching={fetching}
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
                                    options={data?.getAttributes.results.map((item) => ({ label: item.name, value: item.id })).filter(option => !value?.some(sel => sel.value === option.value))}
                                />
                            )}
                        />
                    </div>
                </div>
                {attributes && attributes?.selectedVariant?.length > 0 &&
                    <>
                        <hr className="mb-7" />
                        {attributes.selectedVariant.map((item, i) => (
                            <div className="grid grid-cols-4 gap-2 items-start mb-7" key={i}>
                                <label htmlFor="attribute" className="col-span-1 w-max text-sm">{data?.getAttributes.results.find(a => a.id === item.id)?.name}</label>
                                <div className="col-span-3">
                                    <Controller
                                        control={control}
                                        name={`attributes.selectedVariant.${i}.selected`}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, value } }) => (
                                            <MultiSelect
                                                value={value}
                                                onChange={(e: { label: string, value: string }[]) => {
                                                    onChange(e)
                                                    generateCombinations()
                                                }}
                                                error={errors?.attributes?.selectedVariant?.[i]?.selected ? true : false}
                                                label={data?.getAttributes.results.find(a => a.id === item.id)?.name as string}
                                                fetching={fetching}
                                                options={data?.getAttributes.results.find(a => a.id === item.id)?.values.map(b => ({ value: b.value, label: b.value })).filter(option => !value?.some(sel => sel.value === option.value))}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                }
                {attributes && attributes?.attributes?.length > 0 &&
                    <>
                        <hr className="mb-7" />
                        <p className="text-center">{attributes?.attributes.length} variant</p>
                        {attributes.attributes.map((item, i) => (
                            <div key={i}>
                                <h4 className="text-center font-bold text-lg text-main mb-7">Variant {item.variant}</h4>
                                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                                    <label htmlFor="price" className="col-span-1 w-max text-sm">Price</label>
                                    <div className="col-span-3">
                                        <Input
                                            label="Price"
                                            id="price"
                                            color="red"
                                            crossOrigin="anonymous"
                                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                            }}
                                            {...register?.(`attributes.attributes.${i}.price`, { required: true })}
                                            error={errors?.attributes?.attributes?.[i]?.price ? true : false}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                                    <label htmlFor="price" className="col-span-1 w-max text-sm">Quantity</label>
                                    <div className="col-span-3">
                                        <Input
                                            label="Quantity"
                                            id="price"
                                            color="red"
                                            crossOrigin="anonymous"
                                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                            }}
                                            {...register?.(`attributes.attributes.${i}.quantity`, { required: true })}
                                            error={errors?.attributes?.attributes?.[i]?.quantity ? true : false}
                                        />
                                    </div>
                                </div>
                                <ImageUploader
                                    label="Images"
                                    width={1920}
                                    height={1920}
                                    onChange={(e) => setValue?.(`attributes.attributes.${i}.image`, e)}
                                    is_multiple={false}
                                    folderName="Products"
                                    value={watch?.(`attributes.attributes.${i}.image`)}
                                    className="mb-7"
                                />
                                {attributes.attributes.length - 1 !== i &&
                                    <hr className="mb-10" />
                                }
                            </div>
                        ))}
                    </>
                }
            </div>
        </div>
    );
};

export default ProductVariation;