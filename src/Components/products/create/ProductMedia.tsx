import { useContext, useEffect } from "react";
import { Input } from "@material-tailwind/react";

//Components
import ImagesUploader from "@/Components/Common/ImagesUploader";

//Context
import { productContext } from "@/Context/product.context";

const ProductMedia = () => {
    //Context
    const { register, watch, setValue, errors } = useContext(productContext);

    //Image Value
    const images = watch?.("images");

    //Lifecycle Hook
    useEffect(() => {
        register?.("images", { required: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Media</h4>
            <div className="p-5">
                <ImagesUploader
                    label="Product Image"
                    width={1920}
                    height={1920}
                    size={5}
                    onChange={(e) => setValue?.("images", e)}
                    folderName="Products"
                    value={watch?.("images")}
                    className="mb-7"
                    error={errors?.images ? true : false}
                />
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="youtubeLink" className="col-span-1 text-sm">
                        <p>Product Video</p>
                        <span className="text-xs">You can give product video url (Only youtube)</span>
                    </label>
                    <div className="col-span-3">
                        <Input
                            label="Youtube Link"
                            id="youtubeLink"
                            color="red"
                            crossOrigin="anonymous"
                            {...register?.("youtubeLink")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductMedia;