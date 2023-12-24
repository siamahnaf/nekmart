import { ReactNode } from "react";
import Link from "next/link";

//Data
const data = [
    { name: "Banner 1", url: "/home-page", id: "bannerOne" },
    { name: "Banner 2", url: "/home-page/banner-two", id: "bannerTwo" },
    { name: "Sections", url: "/home-page/sections", id: "section" }
]

//Interface
interface Props {
    children: ReactNode;
    active: string;
}

const HomeLayout = ({ children, active }: Props) => {
    return (
        <div>
            <div className="flex gap-8 mb-10 border-b border-solid border-main border-opacity-30">
                {data.map((item, i) => (
                    <Link href={item.url} key={i} className={`block text-base border-b-2 border-solid font-medium py-4 ${item.id === active ? "border-main" : "border-transparent"}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
            {children}
        </div>
    );
};

export default HomeLayout;