import type { GetServerSideProps } from "next";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

//Components
import Layout from "@/Layout";
import { Notification } from "@/Components/Common/Notifications";
import Basic from "@/Components/Settings/Basic";
import Seo from "@/Components/Settings/Seo";
import Additional from "@/Components/Settings/Additional";
import Social from "@/Components/Settings/Social";

//Context
import { SettingContext, Inputs } from "@/Context/settings.context";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { useMutation, useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_SETTINGS, ADD_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GetSettingData, AddSettingsData } from "@/Urql/Types/Settings/settings.types";

const Setting = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, error, fetching }, mutate] = useMutation<AddSettingsData>(ADD_SETTINGS);
    const [{ data: setting }] = useQuery<GetSettingData>({ query: GET_SETTINGS });

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        getValues,
        watch
    } = useForm<Inputs>({
        defaultValues: {
            logo: setting?.getSiteSettings.logo,
            icon: setting?.getSiteSettings.icon,
            siteTitle: setting?.getSiteSettings.siteTitle,
            slogan: setting?.getSiteSettings.slogan,
            metaTitle: setting?.getSiteSettings.metaTitle,
            metaDescription: setting?.getSiteSettings.metaDescription,
            metaTag: setting?.getSiteSettings.metaTag,
            siteUrl: setting?.getSiteSettings.siteUrl,
            ogTitle: setting?.getSiteSettings.ogTitle,
            ogDescription: setting?.getSiteSettings.ogDescription,
            ogImage: setting?.getSiteSettings.ogImage,
            email: setting?.getSiteSettings.email,
            phone: setting?.getSiteSettings.phone,
            corporateOffice: setting?.getSiteSettings.corporateOffice,
            headOffice: setting?.getSiteSettings.headOffice,
            facebook: setting?.getSiteSettings.facebook,
            instagram: setting?.getSiteSettings.instagram,
            youtube: setting?.getSiteSettings.youtube,
            twitter: setting?.getSiteSettings.twitter,
            linkedIn: setting?.getSiteSettings.linkedIn
        }
    })

    //Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ siteInput: value }).then(() => {
            setNotification(true)
        }).catch(() => {
            setNotification(true)
        })
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <Layout title="Settings" active="setting">
            <SettingContext.Provider value={{ register, setValue, errors, control, getValues, watch }}>
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    severity={error?.message ? "error" : "success"}
                >
                    {error?.message ?? data?.addSettings.message}
                </Notification>
                <h6 className="font-bold text-lg mb-8">Settings</h6>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Basic />
                    <Seo />
                    <Additional />
                    <Social />
                    <div className="text-right mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-8 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Save Settings</span>
                            <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                {fetching &&
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                }
                            </div>
                        </button>
                    </div>
                </form>
            </SettingContext.Provider>
        </Layout>
    );
};

export default Setting;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    //Urql
    const { client, ssrCache } = initUrqlClient();

    //Headers
    const fetchOptions = {
        headers: {
            cookie: ctx.req.headers.cookie as string
        }
    };

    //Queries
    const { data } = await client.query(
        GET_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    if (!data || (data?.getProfile.role !== "moderator" && data?.getProfile.role !== "admin")) {
        return { redirect: { destination: "/login-to-dashboard", permanent: false } }
    }

    //--//
    await client.query(
        GET_SETTINGS, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();
    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}