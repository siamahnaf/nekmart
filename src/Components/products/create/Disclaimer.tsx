import { useState, useContext, ChangeEvent } from "react";
import { Switch, Textarea } from "@material-tailwind/react";

//Context
import { productContext } from "@/Context/product.context";

const Disclaimer = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Context
    const { register, errors, setValue } = useContext(productContext);

    //Onchange Handler
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOpen(e.target.checked)
        if (e.target.checked) {
            setValue?.("disclaimer", "");
        } else {
            setValue?.("disclaimer", "The actual color of the physical product may slightly vary due to the deviation of lighting sources, photography or your device display settings. Delivery charges may vary as per the location, Product Size and Weight; we will notify before proceeding the delivery.");
        }
    }

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Disclaimer</h4>
            <div className="p-5">
                <div className="grid grid-cols-12 gap-2 items-start mb-7">
                    <label htmlFor="disclaimer" className="col-span-9 w-max text-sm">Use Your Own</label>
                    <div className="col-span-3">
                        <Switch
                            crossOrigin="anonymous"
                            color="red"
                            checked={open}
                            id="disclaimer"
                            onChange={onChange}
                        />
                    </div>
                </div>
                <p className="text-sm mb-8"><span className="text-main font-bold">Default Disclaimer:</span> The actual color of the physical product may slightly vary due to the deviation of lighting sources, photography or your device display settings. Delivery charges may vary as per the location, Product Size and Weight; we will notify before proceeding the delivery.</p>
                {open &&
                    <Textarea
                        label="Disclaimer"
                        color="red"
                        containerProps={{
                            className: "!min-w-[50px]"
                        }}
                        {...register?.("disclaimer", { required: true })}
                        error={errors?.disclaimer ? true : false}
                    />
                }
            </div>
        </div>
    );
};

export default Disclaimer;