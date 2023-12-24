import { useContext } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

//Components
import TagInput from "../Common/TagInput";

//Context
import { SettingContext } from "@/Context/settings.context";

//Component
import ImageUploader from "../Common/ImageUploader";

const Seo = () => {
    //Context
    const { register, errors, setValue, watch, control } = useContext(SettingContext);

    return (
        <div className="mb-10">
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-5 py-3 font-medium">SEO Information</h4>
                <div className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="metaTitle" className="col-span-1 w-max">Meta Title</label>
                        <div className="col-span-3">
                            <Input
                                label="Meta title"
                                id="metaTitle"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("metaTitle")}
                                error={errors?.metaTitle ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="metaDescription" className="col-span-1 w-max">Meta Description</label>
                        <div className="col-span-3">
                            <Textarea
                                label="Meta Description"
                                id="metaDescription"
                                color="red"
                                {...register?.("metaDescription")}
                                error={errors?.metaDescription ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="metaTags" className="col-span-1 w-max">Meta Tags</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="metaTag"
                                rules={{ required: true }}
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
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="siteUrl" className="col-span-1 w-max">Site Url</label>
                        <div className="col-span-3">
                            <Input
                                label="Site Url"
                                id="siteUrl"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("siteUrl")}
                                error={errors?.siteUrl ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="ogTitle" className="col-span-1 w-max">OG Title</label>
                        <div className="col-span-3">
                            <Input
                                label="OG Title"
                                id="ogTitle"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("ogTitle")}
                                error={errors?.ogTitle ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="ogDescription" className="col-span-1 w-max">OG Description</label>
                        <div className="col-span-3">
                            <Input
                                label="OG Description"
                                id="ogDescription"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("ogDescription")}
                                error={errors?.ogDescription ? true : false}
                            />
                        </div>
                    </div>
                    <ImageUploader
                        label="OG Image"
                        width={500}
                        height={480}
                        onChange={(e) => setValue?.("ogImage", e)}
                        is_multiple={false}
                        folderName="Settings"
                        value={watch?.("ogImage")}
                    />
                </div>
            </div>
        </div>
    );
};

export default Seo;