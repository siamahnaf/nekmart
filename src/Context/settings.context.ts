import { createContext } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormGetValues, Control, UseFormWatch } from "react-hook-form";

//Types
export interface Inputs {
    logo: string;
    icon: string;
    siteTitle: string;
    slogan: string;
    metaTitle: string;
    metaDescription: string;
    metaTag: string[];
    siteUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    email: string;
    phone: string;
    corporateOffice: string;
    headOffice: string;
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
    linkedIn: string;
}
interface Context {
    register?: UseFormRegister<Inputs>;
    errors?: FieldErrors<Inputs>;
    setValue?: UseFormSetValue<Inputs>;
    control?: Control<Inputs>;
    getValues?: UseFormGetValues<Inputs>;
    watch?: UseFormWatch<Inputs>
}

export const SettingContext = createContext<Context>({});