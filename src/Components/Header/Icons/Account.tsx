import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

//Custom Hook
import { useOutsideClick } from "@/Helpers/hook";

//Urql
import { useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";
import { GetProfileData } from "@/Urql/Types/Account/profile.types";

const Account = () => {
    //Initializing Hook
    const ref = useRef<HTMLDivElement | null>(null);

    //Urql
    const [{ data }] = useQuery<GetProfileData>({ query: GET_PROFILE });

    //State
    const [open, setOpen] = useState<boolean>(false);

    //Use outside Click
    useOutsideClick(ref, () => setOpen(false));

    return (
        <div ref={ref} className="relative">
            <button className="bg-main text-white py-2 px-3 rounded-md flex gap-2 items-center hover:bg-black" onClick={() => setOpen(!open)}>
                {data ? (
                    <>
                        <Icon className="text-xl" icon="gridicons:user" />
                        <span className="text-[15px]">{data.getProfile.name || data.getProfile.phone}</span>
                    </>
                ) : (
                    <>
                        <Icon className="text-xl" icon="gridicons:user" />
                        <span className="text-[15px]">My Account</span>
                    </>
                )}

            </button>
            <ul className={`border border-solid border-gray-300 absolute right-0 top-full bg-white z-20 mt-2 transition-all duration-200 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${open ? `opacity-100 scale-100 origin-right visible` : `opacity-0 invisible origin-right scale-95`} px-5 rounded-md py-4 w-[200px]`}>
                {data ? (
                    <>
                        <li className="mb-2">
                            <Link href="/dashboard">
                                My Panel
                            </Link>
                        </li>
                        <li>
                            <button>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="mb-2">
                            <Link href="/account/login">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/registration">
                                Registration
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Account;