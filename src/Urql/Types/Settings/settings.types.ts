import { SuccessInfo } from "../Success.types";

interface SettingsData {
    id?: string;
    logo?: string;
    icon?: string;
    siteTitle?: string;
    slogan?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaTag: string[];
    siteUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    email?: string;
    phone?: string;
    corporateOffice?: string;
    headOffice?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
    linkedIn?: string;
}

export interface GetSettingData {
    getSiteSettings: SettingsData;
}

export interface AddSettingsData {
    addSettings: SuccessInfo;
}