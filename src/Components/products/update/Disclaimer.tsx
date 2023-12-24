import { useState, useContext, ChangeEvent } from "react";
import { Switch, Textarea } from "@material-tailwind/react";

//Context
import { productContext } from "@/Context/product.context";

const Disclaimer = () => {
    //Context
    const { register, errors, setValue } = useContext(productContext);

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Disclaimer</h4>
            <div className="p-5">
                <Textarea
                    label="Disclaimer"
                    color="red"
                    containerProps={{
                        className: "!min-w-[50px]"
                    }}
                    {...register?.("disclaimer", { required: true })}
                    error={errors?.disclaimer ? true : false}
                    rows={7}
                />
            </div>
        </div>
    );
};

export default Disclaimer;