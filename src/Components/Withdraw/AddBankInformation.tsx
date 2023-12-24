import { useState, Fragment } from "react";
import { Dialog, Input } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Components
import { Notification } from "../Common/Notification";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";
import { ADD_BANK_INFORMATION } from "@/Urql/Query/Withdraw/withdraw.query";
import { AddBankInformation } from "@/Urql/Types/Withdraw/withdraw.types";
import { GetSellerProfileData } from "@/Urql/Types/Authentication/profile.types";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
}

interface Inputs {
    name: string;
    accNumber: string;
    routing: string;
    bankName: string;
    branch: string;
}

const AddBankInformation = ({ open, onClose }: Props) => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data: sellerProfile }, refetch] = useQuery<GetSellerProfileData>({ query: GET_SELLER_PROFILE })
    const [{ data, error, fetching }, mutate] = useMutation<AddBankInformation>(ADD_BANK_INFORMATION);

    //Initialize Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        defaultValues: {
            name: sellerProfile?.getSellerProfile.bank?.name,
            accNumber: sellerProfile?.getSellerProfile.bank?.accNumber,
            routing: sellerProfile?.getSellerProfile.bank?.routing,
            bankName: sellerProfile?.getSellerProfile.bank?.bankName,
            branch: sellerProfile?.getSellerProfile.bank?.branch
        }
    });

    //Handler on Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ bankInput: value }).then(({ data }) => {
            setNotification(true)
            onClose();
            if (data?.addBankInformation.success) {
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification(true)
        })
    };

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <Fragment>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.addBankInformation.message}
            </Notification>
            <Dialog
                open={open}
                handler={onClose}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: -15 },
                }}
                size="md"
                className="p-5 text-black"
            >
                <h2 className="text-xl font-semibold mb-2">Add Bank Information</h2>
                <hr className="mb-2 border-gray-300" />
                <div className="max-h-[450px] overflow-auto">
                    <h4 className="text-lg font-semibold mb-1">Add or update your bank information!</h4>
                    <p className="text-sm font-medium opacity-80">For getting secure payment you have to add your bank information. We won&apos;t publish your information!</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                        <div className="grid grid-cols-4 gap-2 items-start mb-7">
                            <label htmlFor="name" className="col-span-1 w-max text-sm">Name</label>
                            <div className="col-span-3">
                                <Input
                                    label="Name"
                                    id="name"
                                    color="red"
                                    crossOrigin="anonymous"
                                    {...register?.("name", { required: true })}
                                    error={errors?.name ? true : false}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 items-start mb-7">
                            <label htmlFor="accNumber" className="col-span-1 w-max text-sm">Account Number</label>
                            <div className="col-span-3">
                                <Input
                                    label="Account Number"
                                    id="accNumber"
                                    color="red"
                                    crossOrigin="anonymous"
                                    {...register?.("accNumber", { required: true })}
                                    error={errors?.accNumber ? true : false}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 items-start mb-7">
                            <label htmlFor="routing" className="col-span-1 w-max text-sm">Routing</label>
                            <div className="col-span-3">
                                <Input
                                    label="Routing"
                                    id="routing"
                                    color="red"
                                    crossOrigin="anonymous"
                                    {...register?.("routing", { required: true })}
                                    error={errors?.routing ? true : false}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 items-start mb-7">
                            <label htmlFor="bankName" className="col-span-1 w-max text-sm">Bank Name</label>
                            <div className="col-span-3">
                                <Input
                                    label="Bank Name"
                                    id="bankName"
                                    color="red"
                                    crossOrigin="anonymous"
                                    {...register?.("bankName", { required: true })}
                                    error={errors?.bankName ? true : false}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 items-start mb-7">
                            <label htmlFor="branch" className="col-span-1 w-max text-sm">Branch</label>
                            <div className="col-span-3">
                                <Input
                                    label="Branch"
                                    id="branch"
                                    color="red"
                                    crossOrigin="anonymous"
                                    {...register?.("branch", { required: true })}
                                    error={errors?.branch ? true : false}
                                />
                            </div>
                        </div>
                        <div className="text-right mt-8">
                            <button className="bg-main uppercase font-semibold py-2 text-white px-5 rounded-md text-sm relative" type="submit" disabled={fetching}>
                                <span className={fetching ? "opacity-30" : "opacity-100"}>Update Bank Info</span>
                                <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                    {fetching &&
                                        <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                    }
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </Fragment>
    );
};

export default AddBankInformation;