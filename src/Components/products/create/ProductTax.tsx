import { useContext, ChangeEvent } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

//Context
import { productContext } from "@/Context/product.context";

const ProductTax = () => {
    //State
    const { register, errors, control } = useContext(productContext);

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">VAT & TAX</h4>
            <div className="p-5">
                <div className="mb-5">
                    <Input
                        label="Tax"
                        id="tax"
                        color="red"
                        containerProps={{
                            className: "!min-w-[50px]"
                        }}
                        crossOrigin="anonymous"
                        {...register?.("tax", { required: true })}
                        error={errors?.tax ? true : false}
                        onInput={(e: ChangeEvent<HTMLInputElement>) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '')
                        }}
                    />
                </div>
                <div>
                    <Controller
                        control={control}
                        name="taxUnit"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                label="Tax Unit"
                                color="red"
                                error={errors?.taxUnit ? true : false}
                                value={value}
                                onChange={e => onChange(e)}
                                id="taxUnit"
                            >
                                <Option value="flat">Flat</Option>
                                <Option value="percent">Percent</Option>
                            </Select>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductTax;