import { useState } from "react";
import { Stepper, Step } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

//Components
import Products from "./Stepper/Products";
import Shipping from "./Stepper/Shipping";
import Confirm from "./Stepper/Confirm";

//Context
import { checkoutContext, CartTypes, AddressTypes } from "@/Context/checkout.context";

//Urql
import { useQuery } from "urql";
import { GET_CART } from "@/Urql/Query/Cart/cart.query";
import { GetCartData } from "@/Urql/Types/Cart/cart.types";

const Steps = () => {
    //State
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [carts, setCart] = useState<CartTypes | null>(null);
    const [address, setAddress] = useState<AddressTypes | null>(null);

    //Handler
    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    //Urql
    const [{ data, fetching }] = useQuery<GetCartData>({ query: GET_CART });

    //Null Return
    if (!data) return null;

    //Empty Return
    if (data?.getCarts.length === 0) return (
        <div className="border border-solid border-gray-300 rounded-md p-8 w-max mx-auto text-center">
            <h4 className="text-lg font-bold mb-8">There are no items in this cart!</h4>
            <Link href="/" className="text-white bg-main py-2.5 px-5 rounded text-sm uppercase font-semibold">
                Continue Shopping
            </Link>
        </div>
    )

    return (
        <div>
            <div className="w-[50%]  mx-auto">
                <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                >
                    <Step className={`${activeStep === 0 ? "!bg-main !text-white" : activeStep > 0 ? "!bg-green-600" : ""}`}>
                        <Icon icon="la:credit-card-solid" />
                        <div className="absolute top-full w-max text-center mt-2">
                            <p className={`font-medium text-base ${activeStep === 0 ? "text-main" : activeStep > 0 ? "text-green-600" : "text-black"}`}>1. Products</p>
                        </div>
                    </Step>
                    <Step className={`${activeStep === 1 ? "!bg-main !text-white" : activeStep > 1 ? "!bg-green-600" : ""}`}>
                        <Icon icon="bx:map-alt" />
                        <div className="absolute top-full w-max text-center mt-2">
                            <p className={`font-medium text-base ${activeStep === 1 ? "text-main" : activeStep > 1 ? "text-green-600" : "text-black"}`}>2. Shipping Info</p>
                        </div>
                    </Step>
                    <Step className={`${activeStep === 2 ? "!bg-main !text-white" : activeStep > 2 ? "!bg-green-600" : ""}`}>
                        <Icon icon="la:check-circle-solid" />
                        <div className="absolute top-full w-max text-center mt-2">
                            <p className={`font-medium text-base ${activeStep === 2 ? "text-main" : activeStep > 2 ? "text-green-600" : "text-black"}`}>3. Confirm</p>
                        </div>
                    </Step>
                </Stepper>
            </div>
            <checkoutContext.Provider value={{ activeStep, handleNext, handlePrev, carts, setCart, address, setAddress }}>
                <div className="mt-20">
                    <div className={`${activeStep === 0 ? "block" : "hidden"}`}>
                        <Products />
                    </div>
                    <div className={`${activeStep === 1 ? "block" : "hidden"}`}>
                        <Shipping />
                    </div>
                    <div className={`${activeStep === 2 ? "block" : "hidden"}`}>
                        <Confirm />
                    </div>
                </div>
            </checkoutContext.Provider>
        </div>
    );
};

export default Steps;