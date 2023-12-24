import { useState } from "react";
import Image from "next/image";

//Components
import Container from "../Common/Container";
import SubCard from "./SubCard";

//Urql
import { useQuery } from "urql";
import { GET_CATEGORIES } from "@/Urql/Query/Category/category.query";
import { GetCategoriesData } from "@/Urql/Types/Category/category.types";

const Category = () => {
    //State
    const [selected, setSelected] = useState<number>(0);

    //Urql
    const [{ data }] = useQuery<GetCategoriesData>({ query: GET_CATEGORIES, variables: { searchInput: { page: 1, limit: 500 } } });

    //No data return
    if (!data) return null

    return (
        <section>
            <Container className="py-12">
                <div className="grid grid-cols-7 gap-10">
                    <ul className="col-span-2 border border-solid border-gray-300 px-5 py-5 rounded-md">
                        {data?.getMainCategories.results.map((item, i) => (
                            <li className="my-1" key={i}>
                                <button className={`flex gap-2 items-center py-2 px-3 w-full rounded-md ${i === selected ? "bg-main bg-opacity-20 text-main" : ""}`} onClick={() => setSelected(i)}>
                                    <span className="flex-[0_0_10%]">
                                        {item.image ? <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item.image} alt={item.name} width={100} height={100} className="w-full rounded-md" /> : <Image src="/placeholder-300.png" alt={item.name} width={100} height={100} className="w-full rounded-md" />}
                                    </span>
                                    <span className="text-[15px] font-medium">{item.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="col-span-5">
                        <SubCard
                            data={data?.getMainCategories.results[selected]}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Category;