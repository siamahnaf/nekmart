import { Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

//Urql
import { useQuery } from "urql";
import { GET_ORDER } from "@/Urql/Query/Order/order.query";
import { GetOrderData } from "@/Urql/Types/Order/order.types";

//Interface
interface Inputs {
    trackId: string;
}

const Track = () => {
    //Initialize form
    const {
        register,
        handleSubmit,
        watch
    } = useForm<Inputs>();

    //Urql
    const [{ data, error, fetching }, refetch] = useQuery<GetOrderData>({ query: GET_ORDER, variables: { trackInput: { trackId: watch().trackId } }, pause: true })

    //Handler
    const onSubmit: SubmitHandler<Inputs> = () => {
        refetch({ requestPolicy: "cache-and-network" })
    }

    return (
        <div>
            <div className="w-[60%] mx-auto border border-solid border-gray-300 rounded-md py-6 px-6 text-center">
                <h4>Check Your Order Status</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        placeholder="NEK-2310-09225115-53250"
                        className="border border-solid border-main rounded-md py-2 px-4 w-[70%] focus:outline-none mt-6"
                        {...register("trackId", { required: true })}
                        required
                    />
                    <div className="my-5">
                        <button className="text-white bg-main py-2.5 px-5 rounded-md text-sm uppercase font-semibold relative" disabled={fetching} type="submit">
                            <span className={`${fetching ? "opacity-30" : ""}`}>Submit</span>
                            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                {fetching &&
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                }
                            </div>
                        </button>
                    </div>
                </form>
            </div>
            {(data || error) &&
                <Fragment>
                    <div className="w-[60%] mx-auto border border-solid border-gray-300 rounded-md py-6 px-6 mt-6">
                        {error?.message &&
                            <p className="text-main text-base font-semibold text-center">{error.message}</p>
                        }
                        {data &&
                            <Fragment>
                                <div className="mt-8">
                                    <h4 className="text-lg font-semibold mb-5">Products</h4>
                                    <div className="border border-solid border-gray-300 px-5 pb-5 rounded-md">
                                        {data.trackOrder.sellers.map((seller, i) => (
                                            <Fragment key={i}>
                                                {seller.products.map((item, si) => (
                                                    <Fragment key={si}>
                                                        <div className="flex gap-5 my-5 items-center">
                                                            <Image
                                                                src={process.env.NEXT_PUBLIC_IMAGE_URL as string + item.productId?.images[0] as string}
                                                                alt={item.productId?.name as string}
                                                                width={300}
                                                                height={300}
                                                                className="w-[50px] rounded-md"
                                                            />
                                                            <p className="flex-1 line-clamp-1">{item.productId?.name}</p>
                                                            <p className="font-bold">Est. {item.productId?.estimateDelivery || data.trackOrder.estimateDelivery} day(s)</p>

                                                        </div>
                                                        <hr className="border-gray-300" />
                                                    </Fragment>
                                                ))}
                                            </Fragment>
                                        ))}
                                        <div className="mt-5 text-center">
                                            <p>To track the details of your order, go to My <span className="text-main font-bold">My Dashboard {`>`} Purchase History </span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h4 className="text-lg font-semibold mb-5">Order Summery</h4>
                                    <div className="flex gap-5 text-[15px] mb-2">
                                        <span className="flex-1 font-semibold">Total</span>
                                        <span>৳{data?.trackOrder.total}</span>
                                    </div>
                                    <div className="flex gap-5 text-[15px] mb-3">
                                        <span className="flex-1 font-semibold">Shipping Fees</span>
                                        <span>৳{data.trackOrder.shippingFees * data.trackOrder.shippingCount}</span>
                                    </div>
                                    <hr className="border-gray-300" />
                                    <div className="flex gap-5 text-[15px] mt-2">
                                        <span className="flex-1 font-semibold">Subtotal</span>
                                        <span className="text-main font-bold">৳{data.trackOrder.subtotal}</span>
                                    </div>
                                </div>
                            </Fragment>
                        }
                    </div>
                </Fragment>
            }
        </div>
    );
};

export default Track;