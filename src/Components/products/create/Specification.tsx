import { useContext } from "react";
import { Input } from "@material-tailwind/react";
import { useFieldArray } from "react-hook-form";

//Components
import { productContext } from "@/Context/product.context";

const Specification = () => {
    //Context
    const { register, control, errors } = useContext(productContext);

    //Field Array
    const { fields, append, remove } = useFieldArray({
        control,
        name: "specification",
    });

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Specification</h4>
            <div className="p-5">
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="specification" className="col-span-1 w-max text-sm">Specification</label>
                    <div className="col-span-3">
                        {fields.map((_, i) => (
                            <div key={i} className="grid grid-cols-2 gap-x-3 gap-y-1">
                                <div>
                                    <Input
                                        label="Title"
                                        crossOrigin="anonymous"
                                        color="red"
                                        {...register?.(`specification.${i}.title`, { required: true })}
                                        error={errors?.specification?.[i]?.title ? true : false}
                                    />
                                </div>
                                <div>
                                    <Input
                                        label="Value"
                                        crossOrigin="anonymous"
                                        color="red"
                                        {...register?.(`specification.${i}.value`, { required: true })}
                                        error={errors?.specification?.[i]?.value ? true : false}
                                    />
                                </div>
                                <div className="col-span-2 text-right">
                                    <button className="text-main text-sm" onClick={() => remove(i)} disabled={fields.length === 1}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append({ title: "", value: "" })}
                            className="bg-black py-1.5 px-4 rounded-md text-white text-sm font-medium"
                        >
                            Add {fields.length === 0 ? "Specifications" : "More"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Specification;