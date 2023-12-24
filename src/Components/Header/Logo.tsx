import Image from "next/image";
import Link from "next/link";

//Urql
import { useQuery } from "urql";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GetSettingsData } from "@/Urql/Types/Settings/settings.types";

const Logo = () => {
    //Urql
    const [{ data }] = useQuery<GetSettingsData>({ query: GET_SETTINGS });

    return (
        <div className="col-span-2">
            <Link href="/">
                {data?.getSiteSettings.logo ? <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + data.getSiteSettings.logo} alt="Nekmart" width={540} height={120} className="w-[200px]" /> : <h4 className="text-2xl font-bold text-main">Nekmart</h4>}
            </Link>
        </div>
    );
};

export default Logo;