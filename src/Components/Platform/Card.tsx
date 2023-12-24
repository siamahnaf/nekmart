import { useState, ChangeEvent } from "react";
import { Input } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Components
import { Notification } from "../Common/Notifications";

//Urql
import { useQuery, useMutation } from "urql";
import { GET_PLATFORM, ADD_PLATFORM } from "@/Urql/Query/Platform/platform.query";
import { GetPlatformData, AddPlatformData } from "@/Urql/Types/Platform/platform.types";

//Interface
interface Inputs {
    charge: string;
}
const Card = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    //Urql
    const [{ data, error }, refetch] = useQuery<GetPlatformData>({ query: GET_PLATFORM });
    const [{ data: addData, error: addError, fetching }, mutate] = useMutation<AddPlatformData>(ADD_PLATFORM);

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        defaultValues: {
            charge: data?.getPlatform.charge as string
        }
    })

    //Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ platformInput: value }).then(({ data }) => {
            setNotification(true)
            if (data?.addPlatform.success) {
                setOpen(false)
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

    return (
        <div className="border border-solid border-gray-200 rounded-md">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={addError?.message ? "error" : "success"}
            >
                {addError?.message ?? addData?.addPlatform.message}
            </Notification>
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Platform Charge</h4>
            <div className="px-3 py-5">
                {error &&
                    <p className="text-center text-red-600">{error.message}</p>
                }
                {data &&
                    <div className="w-[40%] mx-auto bg-main rounded-md px-10 py-16 text-center text-white">
                        <p className="text-lg font-medium">Your platform Charge</p>
                        <h3 className="text-6xl font-bold mt-2">{data.getPlatform.charge}%</h3>
                    </div>
                }
                <div className="text-center mt-6">
                    <button onClick={() => setOpen(!open)} className="bg-main py-2 px-6 rounded text-white text-sm uppercase font-semibold">
                        Change Platform Charge
                    </button>
                </div>
                {open &&
                    <form onSubmit={handleSubmit(onSubmit)} className="w-[60%] mx-auto mt-8">
                        <Input
                            crossOrigin="anonymous"
                            label="Platform Charge"
                            color="red"
                            {...register("charge", { required: true })}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                        />
                        <div className="text-center mt-6">
                            <button className="bg-main uppercase font-semibold py-2 text-white px-4 rounded-md text-sm relative" type="submit" disabled={fetching}>
                                <span className={fetching ? "opacity-30" : "opacity-100"}>Update</span>
                                <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                    {fetching &&
                                        <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                    }
                                </div>
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
};

export default Card;