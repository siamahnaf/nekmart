import { useState } from "react";
import { Drawer, Collapse } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

//Components
import Logo from "../Logo";

//Urql
import { useQuery } from "urql";
import { GET_CATEGORIES } from "@/Urql/Query/Category/category.query";
import { GetCategoriesData } from "@/Urql/Types/Category/category.types";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
}

const Categories = ({ open, onClose }: Props) => {
    //State
    const [category, setCategory] = useState<string | null>(null);
    const [sub, setSub] = useState<string | null>(null);

    //Urql
    const [{ data }] = useQuery<GetCategoriesData>({ query: GET_CATEGORIES, variables: { searchInput: { page: 1, limit: 200 } } });

    //Handler
    const categoryHandler = (i: string) => {
        if (category === i) {
            setCategory(null)
            setSub(null);
        } else {
            setCategory(i)
            setSub(null)
        }
    }

    const subHandler = (i: string) => {
        if (sub === i) {
            setSub(null)
        } else {
            setSub(i)
        }
    }

    return (
        <Drawer
            open={open}
            onClose={onClose}
            overlayProps={{
                className: "fixed"
            }}
            size={320}
        >
            <div className="flex gap-2 items-center px-2 py-2">
                <div className="flex-1">
                    <Logo />
                </div>
                <div>
                    <button className="p-2 flex justify-center items-center" onClick={onClose}>
                        <Icon className="text-xl" icon="mi:close" />
                    </button>
                </div>
            </div>
            <hr />
            <div className="flex items-center px-4 my-3">
                <h4 className="flex-1 text-lg font-semibold">Categories</h4>
                <Link href="/all-category">See All</Link>
            </div>
            <hr />
            <div className="px-4 py-2 h-screen overflow-auto">
                {data?.getMainCategories.results.map((item, Ig) => (
                    <div key={Ig} className="my-1">
                        <div className="flex gap-3 items-center">
                            <Link href="/" className="text-[15px] hover:text-main">
                                {item.name}
                            </Link>
                            <button className={`flex-1 w-full text-right ${item.category.length === 0 ? "opacity-30" : ""}`} onClick={() => categoryHandler(item.id)} disabled={item.category.length === 0}>
                                <Icon className={`ml-auto text-[28px] transition-all ${category === item.id ? "rotate-90" : "rotate-0"}`} icon="ei:chevron-right" />
                            </button>
                        </div>
                        <Collapse open={item.id === category}>
                            <div className="my-3 ml-2">
                                {item.category.map((cates, Ic) => (
                                    <div key={Ic} className="my-1">
                                        <div className="flex gap-3 items-center">
                                            <Link href="/" className="text-[15px] hover:text-main">
                                                {cates.name}
                                            </Link>
                                            <button className={`flex-1 w-full text-right ${cates.sub_category.length === 0 ? "opacity-30" : ""}`} onClick={() => subHandler(cates.id)} disabled={cates.sub_category.length === 0}>
                                                <Icon className={`ml-auto text-[28px] transition-all ${sub === cates.id ? "rotate-90" : "rotate-0"}`} icon="ei:chevron-right" />
                                            </button>
                                        </div>
                                        <Collapse open={cates.id === sub}>
                                            <div className="ml-4 mt-4">
                                                {cates.sub_category.map((sub, Is) => (
                                                    <div className="flex gap-3 items-center" key={Is}>
                                                        <Link href="/" className="text-[15px] hover:text-main">
                                                            {sub.name}
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </Collapse>
                                    </div>
                                ))}
                            </div>
                        </Collapse>
                    </div>
                ))}
            </div>
        </Drawer>
    );
};

export default Categories;