import { useContext, ChangeEvent } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

//Context
import { productContext } from "@/Context/product.context";

const ProductPrice = () => {
    //Context
    const { register, errors, control } = useContext(productContext);


    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Price & Quantity</h4>
            <div className="p-5">
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="unitPrice" className="col-span-1 w-max text-sm">Unit Price</label>
                    <div className="col-span-3">
                        <Input
                            label="Price"
                            id="unitPrice"
                            color="red"
                            crossOrigin="anonymous"
                            {...register?.("price", { required: true })}
                            error={errors?.price ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="quantity" className="col-span-1 w-max text-sm">Quantity</label>
                    <div className="col-span-3">
                        <Input
                            label="Quantity"
                            id="quantity"
                            color="red"
                            crossOrigin="anonymous"
                            {...register?.("quantity", { required: true })}
                            error={errors?.quantity ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="discount" className="col-span-1 w-max text-sm">Discount</label>
                    <div className="col-span-3">
                        <Input
                            label="Discount"
                            id="discount"
                            color="red"
                            crossOrigin="anonymous"
                            {...register?.("discount", { required: true })}
                            error={errors?.discount ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="discountUnit" className="col-span-1 w-max text-sm">Discount Unit</label>
                    <div className="col-span-3">
                        <Controller
                            control={control}
                            name="discountUnit"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    label="Discount Unit"
                                    color="red"
                                    error={errors?.discountUnit ? true : false}
                                    value={value}
                                    onChange={e => onChange(e)}
                                    id="discountUnit"
                                >
                                    <Option value="flat">Flat</Option>
                                    <Option value="percent">Percent</Option>
                                </Select>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPrice;