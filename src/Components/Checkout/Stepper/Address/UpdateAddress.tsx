import { Fragment, useState, ChangeEvent } from "react";
import { Input, Radio, Textarea, Select, Option } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Dialog } from "@material-tailwind/react";

//Components
import CustomSelect from "@/Components/Common/CustomSelect";
import { Notification } from "@/Components/Common/Notifications";

//Data
import { Barisal, Chittagong, Dhaka, Khulna, Mymensingh, Rajshahi, Rangpur, Sylhet } from "./area.data";

//Urql
import { useMutation, useQuery } from "urql";
import { UPDATE_ADDRESS, GET_ADDRESS } from "@/Urql/Query/Checkout/checkout.query";
import { UpdateAddressData, AddressData } from "@/Urql/Types/Checkout/checkout.types";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    item: AddressData;
}
interface Inputs {
    name: string;
    phone: string;
    gender: string;
    address: string;
    city: string;
    area: string;
    postal: string;
}

const UpdateAddress = ({ open, onClose, item }: Props) => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<UpdateAddressData>(UPDATE_ADDRESS);
    const [_, refetch] = useQuery({ query: GET_ADDRESS })

    //Initialize Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch
    } = useForm<Inputs>({
        defaultValues: {
            name: item.name,
            phone: item.phone,
            gender: item.gender,
            address: item.address,
            city: item.city,
            area: item.area,
            postal: item.postal
        }
    });

    //Form Data
    const city = watch().city;

    //on Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const formData = {
            ...value,
            country: "Bangladesh"
        }
        mutate({ addressInput: formData, updateAddressId: item.id }).then(({ data }) => {
            setNotification(true)
            if (data?.updateAddress.success) {
                onClose()
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification(true)
        })
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //Get Area options
    const getOptions = () => {
        if (city === "barishal") {
            return Barisal;
        } else if (city === "chattogram") {
            return Chittagong;
        } else if (city === "dhaka") {
            return Dhaka;
        } else if (city === "khulna") {
            return Khulna;
        } else if (city === "mymensingh") {
            return Mymensingh;
        } else if (city === "rajshahi") {
            return Rajshahi;
        } else if (city === "rangpur") {
            return Rangpur;
        } else if (city === "sylhet") {
            return Sylhet;
        } else {
            return [];
        }
    }

    return (
        <Fragment>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.updateAddress.message}
            </Notification>
            <Dialog
                open={open}
                handler={onClose}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: -15 },
                }}
                size="md"
                className="p-5"
            >
                <div className="flex gap-4">
                    <h4 className="text-lg font-semibold flex-1">Edit Address</h4>
                    <button className="bg-main bg-opacity-30 text-main rounded-md p-1" onClick={onClose}>
                        <Icon className="text-2xl" icon="eva:close-fill" />
                    </button>
                </div>
                <hr className="mt-2" />
                <form className="max-h-[500px] py-4 pr-4 overflow-auto" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="name" className="col-span-1 w-max">Name</label>
                        <div className="col-span-3">
                            <Input
                                label="Name"
                                id="name"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("name", { required: true })}
                                error={errors.name ? true : false}
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
                                {...register("phone", {
                                    required: true,
                                    pattern: /^0\d{10}$/
                                })}
                                error={errors.phone ? true : false}
                                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="editType" className="col-span-1 w-max">Gender</label>
                        <div className="col-span-3">
                            <div className="flex gap-10">
                                <Radio
                                    id="editType1"
                                    label="Female"
                                    value="female"
                                    crossOrigin="anonymous"
                                    defaultChecked={item.gender === "female"}
                                    color="red"
                                    className="border-gray-400"
                                    {...register("gender")}
                                />
                                <Radio
                                    id="editType2"
                                    crossOrigin="anonymous"
                                    label="Male"
                                    value="male"
                                    color="red"
                                    defaultChecked={item.gender === "male"}
                                    className="border-gray-400"
                                    {...register("gender")}
                                />
                                <Radio
                                    id="editType3"
                                    crossOrigin="anonymous"
                                    label="Other"
                                    color="red"
                                    value="other"
                                    defaultChecked={item.gender === "other"}
                                    className="border-gray-400"
                                    {...register("gender")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="address" className="col-span-1 w-max">Address</label>
                        <div className="col-span-3">
                            <Textarea
                                label="Address"
                                id="address"
                                color="red"
                                {...register("address", { required: true })}
                                error={errors.address ? true : false}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="city" className="col-span-1 w-max">City</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="city"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        label="City"
                                        color="red"
                                        id="city"
                                        value={value}
                                        onChange={(e) => onChange(e)}
                                        error={errors.city ? true : false}
                                    >
                                        <Option value="barishal">Barishal</Option>
                                        <Option value="chattogram">Chattogram</Option>
                                        <Option value="dhaka">Dhaka</Option>
                                        <Option value="khulna">Khulna</Option>
                                        <Option value="mymensingh">Mymensingh</Option>
                                        <Option value="rajshahi">Rajshahi</Option>
                                        <Option value="rangpur">Rangpur</Option>
                                        <Option value="sylhet">Sylhet</Option>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="city" className="col-span-1 w-max">Area</label>
                        <div className="col-span-3">
                            <Controller
                                control={control}
                                name="area"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <CustomSelect
                                        value={value}
                                        onChange={onChange}
                                        label="Area"
                                        options={getOptions()}
                                        emptyMessage="Please select a city!"
                                        error={errors.area ? true : false}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 items-start mb-7">
                        <label htmlFor="postal" className="col-span-1 w-max">Postal code</label>
                        <div className="col-span-3">
                            <Input
                                label="Postal code"
                                id="postal"
                                color="red"
                                crossOrigin="anonymous"
                                {...register("postal")}
                            />
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <button className="bg-main px-4 uppercase font-semibold py-2 text-white rounded-md text-sm relative" type="submit" disabled={fetching}>
                            Save
                            <div className="absolute top-1/2 -translate-y-1/2 right-5">
                                {fetching &&
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                }
                            </div>
                        </button>
                    </div>
                </form>
            </Dialog>
        </Fragment>
    );
};

export default UpdateAddress;