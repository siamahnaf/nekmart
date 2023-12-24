import { Icon } from "@iconify/react";

//Urql
import { useQuery } from "urql";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GetSettingsData } from "@/Urql/Types/Settings/settings.types";

const FooterOne = () => {
    //Urql
    const [{ data }] = useQuery<GetSettingsData>({ query: GET_SETTINGS });

    return (
        <div className="col-span-4">
            <h4 className="text-lg uppercase font-semibold text-main mb-4">Contacts</h4>
            <div>
                <p>Corporate Office: {data?.getSiteSettings.corporateOffice}</p>
                <p>Head Office: {data?.getSiteSettings.headOffice}</p>
            </div>
            <div className="mt-3">
                <p className="flex gap-2 items-center text-main mb-2">
                    <Icon icon="fa:paper-plane" />
                    <span className="font-medium">{data?.getSiteSettings.email}</span>
                </p>
                <p className="flex gap-2 items-center text-main">
                    <Icon icon="bi:telephone-fill" />
                    <span className="font-medium">{data?.getSiteSettings.phone}</span>
                </p>
            </div>
        </div>
    );
};

export default FooterOne;