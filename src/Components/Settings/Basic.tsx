import { useContext } from "react";
import { Input } from "@material-tailwind/react";

//Context
import { SettingContext } from "@/Context/settings.context";

//Component
import ImageUploader from "../Common/ImageUploader";

const Basic = () => {
    //Context
    const { register, errors, setValue, watch } = useContext(SettingContext);

    return (
        <div className="mb-10">
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-5 py-3 font-medium">Basic Information</h4>
                <div className="p-5">
                    <ImageUploader
                        label="Logo"
                        width={540}
                        height={120}
                        onChange={(e) => setValue?.("logo", e)}
                        is_multiple={false}
                        folderName="Settings"
                        value={watch?.("logo")}
                        className="mb-7"
                    />
                    <ImageUploader
                        label="Fevicon"
                        width={48}
                        height={48}
                        onChange={(e) => setValue?.("icon", e)}
                        is_multiple={false}
                        folderName="Settings"
                        value={watch?.("icon")}
                        className="mb-7"
                    />
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="siteTitle" className="col-span-1 w-max">Site Title</label>
                        <div className="col-span-3">
                            <Input
                                label="Site title"
                                id="siteTitle"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("siteTitle")}
                                error={errors?.siteTitle ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="slogan" className="col-span-1 w-max">Slogan</label>
                        <div className="col-span-3">
                            <Input
                                label="Slogan"
                                id="slogan"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("slogan")}
                                error={errors?.slogan ? true : false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Basic;