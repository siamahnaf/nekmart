import { useContext } from "react";
import { Input } from "@material-tailwind/react";

//Context
import { SettingContext } from "@/Context/settings.context";

const Social = () => {
    //Context
    const { register, errors } = useContext(SettingContext);

    return (
        <div>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-5 py-3 font-medium">Social Information</h4>
                <div className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="facebook" className="col-span-1 w-max">Facebook URL</label>
                        <div className="col-span-3">
                            <Input
                                label="Facebook URL"
                                id="facebook"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("facebook")}
                                error={errors?.facebook ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="instagram" className="col-span-1 w-max">Instagram URL</label>
                        <div className="col-span-3">
                            <Input
                                label="Instagram URL"
                                id="instagram"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("instagram")}
                                error={errors?.instagram ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="youtube" className="col-span-1 w-max">Youtube URL</label>
                        <div className="col-span-3">
                            <Input
                                label="Youtube URL"
                                id="youtube"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("youtube")}
                                error={errors?.youtube ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="twitter" className="col-span-1 w-max">Twitter URL</label>
                        <div className="col-span-3">
                            <Input
                                label="Twitter URL"
                                id="twitter"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("twitter")}
                                error={errors?.twitter ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="linkedIn" className="col-span-1 w-max">LinkedIn URL</label>
                        <div className="col-span-3">
                            <Input
                                label="LinkedIn URL"
                                id="linkedIn"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("linkedIn")}
                                error={errors?.linkedIn ? true : false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Social;