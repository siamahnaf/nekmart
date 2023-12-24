import { useState, useMemo } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Data
import { AdminNavs, ModeratorNavs, EditorNavs } from "./data";


//Urql
import { useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GetProfileData } from "@/Urql/Types/Authentication/auth.types";

//Interface
interface NavTypes {
    title: string;
    id: string;
    url: string;
    icon: string;
}
interface Props {
    active?: string;
}

const Navs = ({ active }: Props) => {
    //State
    const [navs, setNavs] = useState<NavTypes[]>([]);

    //Urql
    const [{ data }] = useQuery<GetProfileData>({ query: GET_PROFILE });

    const LogoutHandler = () => {

    }

    //Hook
    useMemo(() => {
        if (data?.getProfile.role === "admin") {
            setNavs(AdminNavs)
        } else if (data?.getProfile.role === "moderator") {
            setNavs(ModeratorNavs)
        } else if (data?.getProfile.role === "editor") {
            setNavs(EditorNavs)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.getProfile])

    return (
        <div className="px-2 mt-5">
            <ul>
                {navs.map((item, i) => (
                    <li key={i} className="my-1">
                        <Link href={item.url} className={`flex items-center gap-3 opacity-80 py-2 px-3 rounded group hover:bg-main hover:bg-opacity-30 hover:opacity-100 ${item.id === active && "bg-main bg-opacity-30 !opacity-100"}`}>
                            <Icon className={`text-base -mb-[3px] group-hover:text-main ${item.id === active && "text-main"}`} icon={item.icon} />
                            <span className="text-sm">{item.title}</span>
                        </Link>
                    </li>
                ))}
                <li>
                    <button onClick={LogoutHandler} className={`flex items-center gap-3 opacity-80 py-2 px-3 rounded group hover:bg-main hover:bg-opacity-30 hover:opacity-100 w-full`}>
                        <Icon className={`text-base -mb-[3px] group-hover:text-main`} icon="ri:logout-circle-r-fill" />
                        <span className="text-sm">Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Navs;