import { useContext } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

//Components
import TagInput from "@/Components/Common/TagInput";
import ImageUploader from "@/Components/Common/ImageUploader";

//Context
import { productContext } from "@/Context/product.context";

const ProductSeo = () => {
    //Context
    const { register, errors, control, watch, setValue } = useContext(productContext);

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product SEO</h4>
            <div className="p-5">
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="metaTitle" className="col-span-1 w-max text-sm">Meta Title</label>
                    <div className="col-span-3">
                        <Input
                            label="Meta Title"
                            id="metaTitle"
                            color="red"
                            crossOrigin="anonymous"
                            {...register?.("meta.title")}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="metaDescription" className="col-span-1 w-max text-sm">Meta Description</label>
                    <div className="col-span-3">
                        <Textarea
                            label="Meta Description"
                            id="metaDescription"
                            color="red"
                            {...register?.("meta.description")}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="metaTags" className="col-span-1 w-max text-sm">Meta Tags</label>
                    <div className="col-span-3">
                        <Controller
                            control={control}
                            name="meta.metaTags"
                            render={({ field: { onChange, value } }) => (
                                <TagInput
                                    label="Meta Tags"
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </div>
                </div>
                <ImageUploader
                    label="Meta Image"
                    width={1200}
                    height={627}
                    onChange={(e) => setValue?.("meta.image", e)}
                    is_multiple={false}
                    folderName="Products"
                    value={watch?.("meta.image")}
                />
            </div>
        </div>
    );
};

export default ProductSeo;