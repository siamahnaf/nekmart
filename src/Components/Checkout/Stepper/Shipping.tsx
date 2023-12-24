import { useState, useEffect, useContext } from "react";
import { Checkbox } from "@material-tailwind/react";
import { Icon } from "@iconify/react";

//Components
import AddAddress from "./Address/AddAddress";
import AddressMenu from "./Address/AddressMenu";

//Context
import { checkoutContext, AddressTypes, CartTypes } from "@/Context/checkout.context";

//Urql
import { useQuery } from "urql";
import { GET_ADDRESS, GET_SHIPPING } from "@/Urql/Query/Checkout/checkout.query";
import { GetAddressData, GetActiveShipping } from "@/Urql/Types/Checkout/checkout.types";

const Shipping = () => {
    //State
    const [check, setCheck] = useState<boolean>(true);
    const [add, setAdd] = useState<boolean>(false);

    //Context
    const { address, setAddress, carts, setCart, handleNext, handlePrev } = useContext(checkoutContext);

    //Urql
    const [{ data }] = useQuery<GetAddressData>({ query: GET_ADDRESS });
    const [{ data: shipping }] = useQuery<GetActiveShipping>({ query: GET_SHIPPING });

    //Get Total tax
    const totalTax = carts?.sellers.reduce((acc, seller) => {
        const sellerTotalTax = seller.products.reduce((sellerAcc, product) => {
            return sellerAcc + product.tax;
        }, 0);

        return acc + sellerTotalTax;
    }, 0);

    //Calculate Shipping Fee
    const getShippingFees = (id: string) => {
        const address = data?.getAddress.find(item => item.id === id);
        let shippingFee: number = 0;
        if (address) {
            if (address.city === "dhaka") {
                shippingFee = Number(shipping?.getActiveShipping.rateInsideDhaka)
            }
            if (address.area === "savar") {
                shippingFee = Number(shipping?.getActiveShipping.rateInSavar)
            } else {
                shippingFee = Number(shipping?.getActiveShipping.rateOutsideDhaka)
            }
        }
        setCart?.((prevCart) => ({
            ...prevCart,
            shippingCount: carts?.sellers.length,
            shippingFees: shippingFee,
            subtotal: ((Number(carts?.total) + Number(totalTax) + (Number(shippingFee) * Number(carts?.sellers.length)))) - Number(carts?.couponDiscount),
            estimateDelivery: shipping?.getActiveShipping.estimateDelivery
        }) as CartTypes);
    }

    //Handler
    const onShippingChange = (id: string) => {
        setAddress?.((prev) => ({
            ...prev,
            shippingAddress: id
        }) as AddressTypes)
        getShippingFees(id)
    }

    const onBillingChange = (id: string) => {
        setAddress?.((prev) => ({
            ...prev,
            billingAddress: id
        }) as AddressTypes)
    }

    //LifeCycle Hook
    useEffect(() => {
        if (data && data?.getAddress.length > 0) {
            setAddress?.({ shippingAddress: data?.getAddress[0].id, billingAddress: data?.getAddress[0].id })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if (carts?.total) {
            getShippingFees(data?.getAddress[0].id as string)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, shipping, carts?.total, carts?.couponDiscount])

    return (
        <div>
            <div className="grid grid-cols-12 gap-10 items-start">
                <div className="col-span-8 border border-solid border-gray-300 p-5">
                    <h4 className="text-lg font-bold">Shipping Address</h4>
                    {data?.getAddress.length === 0 &&
                        <p className="text-main opacity-80 mt-4">No address added yet!</p>
                    }
                    <div className="grid grid-cols-2 gap-4 mt-5">
                        {data?.getAddress.map((item, i) => (
                            <div className={`flex gap-3 items-start relative border border-solid p-4 rounded-md ${item.id === address?.shippingAddress ? "border-main" : "border-gray-400"}`} key={i}>
                                <div className={`border border-solid border-gray-400 w-4 h-4 rounded-full mt-[2px] cursor-pointer relative after:w-3 after:h-3 after:rounded-full after:left-1/2 after:top-1/2 after:absolute after:-translate-x-1/2 after:-translate-y-1/2 ${item.id === address?.shippingAddress ? "after:bg-main" : "after:bg-transparent"}`} onClick={() => onShippingChange(item.id)}></div>
                                <div>
                                    <p className="text-sm font-medium">
                                        <span className="opacity-60">Name: </span>{item.name}
                                    </p>
                                    <p className="text-sm font-medium">
                                        <span className="opacity-60">Phone: </span>{item.phone}
                                    </p>
                                    <p className="text-sm font-medium">
                                        <span className="opacity-60">Address: </span>{item.address}
                                    </p>
                                    <p className="text-sm font-medium">
                                        <span className="opacity-60">City: </span>{item.city}
                                    </p>
                                    <p className="text-sm font-medium">
                                        <span className="opacity-60">Area: </span>{item.area}
                                    </p>
                                    <p className="text-sm font-medium">
                                        <span className="opacity-60">Postal code: </span>{item.postal}
                                    </p>
                                </div>
                                <AddressMenu item={item} />
                                {item.default &&
                                    <p className="absolute bottom-3 right-3 text-xs bg-main px-1 py-px rounded text-white">Default</p>
                                }
                            </div>
                        ))}
                    </div>
                    <h4 className="text-lg font-bold mt-8">Billing Address</h4>
                    <div className="-ml-2 mt-2">
                        <Checkbox
                            crossOrigin="anonymous"
                            label="Same as shipping address"
                            color="red"
                            className="w-4 h-4 rounded border-gray-400"
                            labelProps={{ className: "text-base font-medium" }}
                            defaultChecked
                            onChange={(e) => {
                                setCheck(e.target.checked)
                                if (!e.target.checked) {
                                    setAddress?.((prev) => ({
                                        ...prev,
                                        billingAddress: prev?.shippingAddress
                                    }) as AddressTypes)
                                }
                            }}
                        />
                    </div>
                    {!check &&
                        data?.getAddress.length === 0 &&
                        <p className="text-main opacity-80 mt-4">No address added yet!</p>
                    }
                    {!check &&
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            {data?.getAddress.map((item, i) => (
                                <div className={`flex gap-3 items-start relative border border-solid p-4 rounded-md ${item.id === address?.billingAddress ? "border-main" : "border-gray-400"}`} key={i}>
                                    <div className={`border border-solid border-gray-400 w-4 h-4 rounded-full mt-[2px] cursor-pointer relative after:w-3 after:h-3 after:rounded-full after:left-1/2 after:top-1/2 after:absolute after:-translate-x-1/2 after:-translate-y-1/2 ${item.id === address?.billingAddress ? "after:bg-main" : "after:bg-transparent"}`} onClick={() => onBillingChange(item.id)}></div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            <span className="opacity-60">Name: </span>{item.name}
                                        </p>
                                        <p className="text-sm font-medium">
                                            <span className="opacity-60">Phone: </span>{item.phone}
                                        </p>
                                        <p className="text-sm font-medium">
                                            <span className="opacity-60">Address: </span>{item.address}
                                        </p>
                                        <p className="text-sm font-medium">
                                            <span className="opacity-60">City: </span>{item.city}
                                        </p>
                                        <p className="text-sm font-medium">
                                            <span className="opacity-60">Area: </span>{item.area}
                                        </p>
                                        <p className="text-sm font-medium">
                                            <span className="opacity-60">Postal code: </span>{item.postal}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    <div className="border border-solid border-gray-200 mt-10 text-center py-4 bg-[#f6f6f6] rounded-md cursor-pointer select-none" onClick={() => setAdd(true)}>
                        <p className="text-3xl opacity-80">+</p>
                        <p className="opacity-80">Add Address</p>
                    </div>
                    <AddAddress
                        open={add}
                        onClose={() => setAdd(false)}
                    />
                </div>
                <div className="col-span-4">
                    <div className="flex gap-5 text-[15px]">
                        <span className="flex-1 font-semibold">Items Total</span>
                        <span>৳{carts?.total}</span>
                    </div>
                    <hr className="border-gray-400 my-2" />
                    <div className="flex gap-5 text-[15px]">
                        <span className="flex-1 font-semibold">Tax</span>
                        <span>৳{totalTax}</span>
                    </div>
                    <hr className="border-gray-400 my-2" />
                    <div className="flex gap-5 text-[15px]">
                        <span className="flex-1 font-semibold">Coupon Discount</span>
                        <span>৳{carts?.couponDiscount}</span>
                    </div>
                    <hr className="border-gray-400 my-2" />
                    <div className="flex gap-5 text-[15px]">
                        <span className="flex-1 font-semibold">Shipping Fees</span>
                        <span>৳{Number(carts?.shippingFees) * Number(carts?.shippingCount)}</span>
                    </div>
                    <hr className="border-gray-400 my-2" />
                    <div className="flex gap-5 text-[15px]">
                        <span className="flex-1 font-semibold">Subtotal</span>
                        <span>৳{carts?.subtotal}</span>
                    </div>
                    <div className="mt-5">
                        <button className={`bg-main py-2 text-center w-full rounded-md text-sm font-medium text-white ${!address?.shippingAddress ? "opacity-50" : ""}`} disabled={!address?.shippingAddress} onClick={handleNext}>
                            Proceed to payment
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <button onClick={handlePrev} className="flex gap-1.5 items-center text-base text-main font-medium">
                    <Icon icon="fa6-solid:arrow-left-long" />
                    <span>Back</span>
                </button>
            </div>
        </div>
    );
};

export default Shipping;