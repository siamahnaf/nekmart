import { useRouter } from "next/router";

//Components
import Package from "./Package";
import OrderNote from "./OrderNote";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_ORDER } from "@/Urql/Query/Order/order.query";
import { GetSingleOrder } from "@/Urql/Types/Order/order.types";

const Details = () => {
    //Initialize Hook
    const router = useRouter();

    //Urql
    const [{ data }] = useQuery<GetSingleOrder>({ query: GET_SINGLE_ORDER, variables: { getOrderId: router.query.id } });

    //Get Total tax
    const totalTax = data?.getOrder?.sellers.reduce((acc, seller) => {
        const sellerTotalTax = seller.products.reduce((sellerAcc, product) => {
            return sellerAcc + product.tax;
        }, 0);

        return acc + sellerTotalTax;
    }, 0);

    if (!data) return null;

    return (
        <div>
            <h4 className="text-lg font-bold mb-5">Order Details</h4>
            {data.getOrder.sellers.map((item, i) => (
                <Package
                    item={item}
                    key={i}
                    totalTax={totalTax as number}
                    shippingFees={data.getOrder.shippingFees as number}
                    couponDiscount={data.getOrder.couponDiscount as number}
                    packageLength={data.getOrder.sellers.length}
                />
            ))}
            <div className="border border-solid border-gray-200 rounded-md mb-8">
                <h4 className="text-lg font-semibold px-3 py-3 border-b border-solid border-gray-200">Total Summery</h4>
                <div className="p-5">
                    <div className="flex gap-5 text-[15px] mb-2">
                        <span className="flex-1 font-semibold">Total</span>
                        <span>৳{data.getOrder.total}</span>
                    </div>
                    <div className="flex gap-5 text-[15px] mb-2">
                        <span className="flex-1 font-semibold">Tax</span>
                        <span>৳{totalTax}</span>
                    </div>
                    <div className="flex gap-5 text-[15px] mb-2">
                        <span className="flex-1 font-semibold">Shipping Fees</span>
                        <span>৳{Number(data.getOrder.shippingFees) * Number(data.getOrder.shippingCount)}</span>
                    </div>
                    <div className="flex gap-5 text-[15px] mb-2">
                        <span className="flex-1 font-semibold">Coupon Discount</span>
                        <span>৳{data.getOrder.couponDiscount}</span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex gap-5 text-[15px] mt-2">
                        <span className="flex-1 font-semibold">Subtotal</span>
                        <span className="text-main font-bold">৳{data.getOrder.subtotal}</span>
                    </div>
                </div>
            </div>

            <div className="border border-solid border-gray-200 rounded-md mb-8">
                <h4 className="text-lg font-semibold px-3 py-3 border-b border-solid border-gray-200">Addresses</h4>
                <div className="p-5 grid grid-cols-2 gap-10">
                    <div>
                        <h4 className="text-base font-semibold mb-2">Shipping Address</h4>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Name: </span>
                            {data.getOrder.shippingAddress?.name}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Phone: </span>
                            {data.getOrder.shippingAddress?.phone}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Address: </span>
                            {data.getOrder.shippingAddress?.address}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">City: </span>
                            {data.getOrder.shippingAddress?.city}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Area: </span>
                            {data.getOrder.shippingAddress?.area}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-base font-semibold mb-2">Billing Address</h4>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Name: </span>
                            {data.getOrder.billingAddress?.name}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Phone: </span>
                            {data.getOrder.billingAddress?.phone}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Address: </span>
                            {data.getOrder.billingAddress?.address}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">City: </span>
                            {data.getOrder.billingAddress?.city}
                        </p>
                        <p className="mb-1">
                            <span className="font-medium opacity-40">Area: </span>
                            {data.getOrder.billingAddress?.area}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border border-solid border-gray-200 rounded-md mb-8">
                <h4 className="text-lg font-semibold px-3 py-3 border-b border-solid border-gray-200">Order Notes</h4>
                <div className="p-5">
                    <div className="grid grid-cols-2 gap-5">
                        <p>
                            <span className="font-medium opacity-40">Customer Name: </span>
                            {data.getOrder.user?.name}
                        </p>
                        <p>
                            <span className="font-medium opacity-40">Custom Phone: </span>
                            {data.getOrder.user?.phone}
                        </p>
                    </div>
                    <OrderNote />
                </div>
            </div>
        </div>
    );
};

export default Details;