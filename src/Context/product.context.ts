import { createContext } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormGetValues, Control, UseFormWatch } from "react-hook-form";

//Types
export interface Attributes {
    attributeIds: { label: string, value: string }[];
    selectedVariant: { id: string, selected: { label: string, value: string }[] }[];
    attributes: { variant: string, price: string, quantity: string, image: string }[];
}
export interface Inputs {
    name: string;
    main_category: string;
    category: string;
    sub_category: { label: string, value: string }[];
    brand: string;
    unit: string;
    minPurchase: string;
    tag: { label: string, value: string }[];
    refundAble: boolean;
    images: string[];
    youtubeLink: string;
    flash: string;
    price: string;
    quantity: string;
    discount: string;
    discountUnit: string;
    attributes: Attributes;
    description: string;
    specification: { title: string, value: string }[];
    visibility: boolean;
    meta: {
        title: string;
        description: string;
        image: string;
        metaTags: string[];
    }
    estimateDelivery: string;
    warranty: string;
    showStock: boolean;
    tax: string;
    taxUnit: string;
    disclaimer: string;
}
interface Context {
    register?: UseFormRegister<Inputs>;
    errors?: FieldErrors<Inputs>;
    setValue?: UseFormSetValue<Inputs>;
    control?: Control<Inputs>;
    getValues?: UseFormGetValues<Inputs>;
    watch?: UseFormWatch<Inputs>
}

export const productContext = createContext<Context>({});