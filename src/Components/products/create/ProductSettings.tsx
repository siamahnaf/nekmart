import { useContext } from "react";
import { Switch } from "@material-tailwind/react";

//Context
import { productContext } from "@/Context/product.context";

const ProductSettings = () => {
    //Context
    const { register } = useContext(productContext);

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Settings</h4>
            <div className="p-5">
                <div className="grid grid-cols-12 gap-2 items-start mb-7">
                    <label htmlFor="visibility" className="col-span-9 w-max text-sm">Visibility</label>
                    <div className="col-span-3">
                        <Switch
                            crossOrigin="anonymous"
                            color="red"
                            defaultChecked
                            id="visibility"
                            {...register?.("visibility")}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-2 items-start mb-7">
                    <label htmlFor="stock" className="col-span-9 w-max text-sm">Show stock</label>
                    <div className="col-span-3">
                        <Switch
                            crossOrigin="anonymous"
                            color="red"
                            id="stock"
                            defaultChecked
                            {...register?.("showStock")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSettings;