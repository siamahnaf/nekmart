import Image from "next/image";
import Link from "next/link";

//Container
import Container from "../Common/Container";

//Urql
import { useQuery } from "urql";
import { GET_CATEGORIES } from "@/Urql/Query/Category/category.query";
import { GetCategoriesData } from "@/Urql/Types/Category/category.types";

const Categories = () => {
    //Urql
    const [{ data }] = useQuery<GetCategoriesData>({ query: GET_CATEGORIES, variables: { searchInput: { page: 1, limit: 30 } } });

    return (
        <section className="bg-main bg-opacity-20">
            <Container className="py-14">
                <div className="text-center">
                    <h4 className="text-2xl font-semibold text-main">Categories</h4>
                    <p className="text-[15px] mt-2 font-light opacity-60">Get Your Product from Category</p>
                </div>
                <div className="grid grid-cols-5 gap-5 mt-12">
                    {data?.getMainCategories.results.slice(0, 15).map((item, i) => (
                        <div key={i} className="bg-white rounded-md text-center py-9">
                            <Link href={`/category`}>
                                {item.image ?
                                    <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item.image} alt={item.name} width={300} height={300} className="w-[80px] mx-auto" /> :

                                    <Image src="/placeholder-300.png" alt={item.name} width={300} height={300} className="w-[80px] mx-auto" />
                                }
                                <p className="mt-2 text-[15px]">{item.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link href="/" className="py-1.5 px-4 bg-main rounded-md text-white">
                        All Category
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default Categories;