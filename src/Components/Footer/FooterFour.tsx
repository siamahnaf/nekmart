import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Urql
import { useQuery } from "urql";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GetSettingsData } from "@/Urql/Types/Settings/settings.types";

const FooterFour = () => {
    //Urql
    const [{ data }] = useQuery<GetSettingsData>({ query: GET_SETTINGS })

    return (
        <div className="col-span-4">
            <h4 className="text-lg uppercase font-semibold text-main mb-4">Download Our Apps</h4>
            <div className="flex gap-2">
                <Image src="/google.png" className="w-[150px]" alt="Google" width={365} height={115} />
                <Image src="/app.png" className="w-[150px]" alt="Google" width={365} height={115} />
            </div>
            {(data?.getSiteSettings.facebook || data?.getSiteSettings.instagram || data?.getSiteSettings.twitter || data?.getSiteSettings.youtube || data?.getSiteSettings.linkedIn) &&
                <Fragment>
                    <h4 className="text-lg uppercase font-semibold text-main mb-4 mt-4">Join Us</h4>
                    <ul className="flex gap-2">
                        {data?.getSiteSettings.facebook &&
                            <li>
                                <Link href={data.getSiteSettings.facebook} className="w-10 h-10 flex justify-center items-center border border-gray_whiter rounded-sm">
                                    <Icon className="text-xl" icon="fa-brands:facebook-f" />
                                </Link>
                            </li>
                        }
                        {data?.getSiteSettings.instagram &&
                            <li>
                                <Link href={data.getSiteSettings.instagram} className="w-10 h-10 flex justify-center items-center border border-gray_whiter rounded-sm">
                                    <Icon className="text-xl" icon="akar-icons:instagram-fill" />
                                </Link>
                            </li>
                        }
                        {data?.getSiteSettings.youtube &&
                            <li>
                                <Link href={data.getSiteSettings.youtube} className="w-10 h-10 flex justify-center items-center border border-gray_whiter rounded-sm">
                                    <Icon className="text-xl" icon="fa:youtube" />
                                </Link>
                            </li>
                        }
                        {data?.getSiteSettings.twitter &&
                            <li>
                                <Link href={data.getSiteSettings.twitter} className="w-10 h-10 flex justify-center items-center border border-gray_whiter rounded-sm">
                                    <Icon className="text-xl" icon="bi:twitter" />
                                </Link>
                            </li>
                        }
                        {data?.getSiteSettings.linkedIn &&
                            <li>
                                <Link href={data.getSiteSettings.linkedIn} className="w-10 h-10 flex justify-center items-center border border-gray_whiter rounded-sm">
                                    <Icon className="text-xl" icon="cib:linkedin-in" />
                                </Link>
                            </li>
                        }
                    </ul>
                </Fragment>
            }
            <div className="mt-5">
                <p className="text-main"><span className="font-semibold">Trade License No:</span> 20232628003018365</p>
                <p className="text-main"><span className="font-semibold">Tin:</span> 22050988085</p>
            </div>
        </div>
    );
};

export default FooterFour;