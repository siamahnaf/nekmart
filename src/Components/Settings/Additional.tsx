import { useContext } from "react";
import { Input, Textarea } from "@material-tailwind/react";

//Context
import { SettingContext } from "@/Context/settings.context";

const Additional = () => {
    //Context
    const { register, errors } = useContext(SettingContext);

    return (
        <div className="mb-10">
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-5 py-3 font-medium">Additional Information</h4>
                <div className="p-5">
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="email" className="col-span-1 w-max">Email</label>
                        <div className="col-span-3">
                            <Input
                                label="Email"
                                id="email"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("email", {
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                                })}
                                error={errors?.email ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="phone" className="col-span-1 w-max">Phone</label>
                        <div className="col-span-3">
                            <Input
                                label="Phone"
                                id="phone"
                                color="red"
                                crossOrigin="anonymous"
                                {...register?.("phone")}
                                error={errors?.email ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="corporate" className="col-span-1 w-max">Corporate Office</label>
                        <div className="col-span-3">
                            <Textarea
                                label="Address"
                                id="corporate"
                                color="red"
                                {...register?.("corporateOffice")}
                                error={errors?.corporateOffice ? true : false}
                                rows={3}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="head" className="col-span-1 w-max">Head Office</label>
                        <div className="col-span-3">
                            <Textarea
                                label="Address"
                                id="head"
                                color="red"
                                {...register?.("headOffice")}
                                error={errors?.headOffice ? true : false}
                                rows={3}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Additional;