import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Helpers
import { isUrl } from "@/Helpers/url.helpers";

//Urql
import { useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";
import { GetProfileData } from "@/Urql/Types/Account/profile.types";

//Interface
interface Props {
    active: string;
}

const Sidebar = ({ active }: Props) => {
    //Urql
    const [{ data }] = useQuery<GetProfileData>({ query: GET_PROFILE });

    return (
        <div className="border border-solid border-gray-300 rounded-md overflow-hidden">
            <div className="bg-main text-white text-center py-8 px-2">
                <div>
                    {data?.getProfile?.avatar ? (
                        <Image src={isUrl(data.getProfile.avatar) ? data.getProfile.avatar : (process.env.NEXT_PUBLIC_IMAGE_URL + data.getProfile.avatar)} alt={data.getProfile?.name || "Profile"} width={60} height={60} className="w-[60px] h-[60px] rounded-full mx-auto" />
                    ) : (
                        <Image src="/avatar.png" alt={data?.getProfile?.name || "profile"} width={60} height={60} className="w-[60px] h-[60px] rounded-full mx-auto" />
                    )}
                </div>
                <h6 className="font-bold text-lg mt-4">{data?.getProfile.name}</h6>
                <p className="text-base">+{data?.getProfile.phone}</p>
            </div>

            <ul className="my-4 px-3">
                {Navs.map((item, i) => (
                    <li key={i} className="mb-1">
                        <Link href={item.url} className={`flex gap-2 items-center py-2 px-2.5 rounded-md bg-opacity-30 ${item.id === active ? "bg-main" : "bg-transparent"}`}>
                            <Icon className={`${item.id === active ? "text-main" : ""}`} icon={item.icon} />
                            <span className="text-sm">{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

const Navs = [
    {
        title: "Dashboard",
        id: "dashboard",
        url: "/dashboard",
        icon: "codicon:home"
    },
    {
        title: "My Orders",
        id: "purchase",
        url: "/dashboard/purchase-history",
        icon: "ant-design:file-text-outlined"
    },
    {
        title: "Set Refund Request",
        id: "refund",
        url: "/dashboard/refund-request",
        icon: "cil:media-skip-backward"
    },
    {
        title: "Wishlist",
        id: "wishlist",
        url: "/dashboard/wishlist",
        icon: "ant-design:heart-outlined"
    },
    {
        title: "Earning Points",
        id: "earning",
        url: "/dashboard/earning-points",
        icon: "bx:dollar"
    },
    {
        title: "Manage Profile",
        id: "profile",
        url: "/dashboard/manage-profile",
        icon: "ant-design:user-outlined"
    }
]