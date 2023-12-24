import { Fragment } from "react";
import Link from "next/link";
import slugify from "slugify";

//Components
import Container from "../Common/Container";
import ProductCard from "../Common/ProductCard";
import Header from "./Products/Header";

//Urql
import { useQuery } from "urql";
import { GET_SECTIONS } from "@/Urql/Query/Home/home.query";
import { GetSectionData } from "@/Urql/Types/Home/home.types";

const SectionTwo = () => {
    //Urql
    const [{ data }] = useQuery<GetSectionData>({ query: GET_SECTIONS });

    if (!data) return null;

    return (
        <Fragment>
            {data.getSectionProducts.length > 0 && data.getSectionProducts[3].products.length > 0 &&
                <section>
                    <Container className="py-12">
                        <Header
                            section={data.getSectionProducts[3].section}
                        />
                        <div className="grid grid-cols-5 gap-6 mt-12">
                            {data.getSectionProducts[3].products.map((item, i) => (
                                <Link href={`/product/${slugify(item.name, { lower: true })}-${item.id}`} key={i}>
                                    <ProductCard product={item} />
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            {data.getSectionProducts[3].section.base === "category" ?
                                (<Link href="/" className="py-2 px-4 bg-main text-white rounded-md font-medium text-sm">
                                    View More
                                </Link>) : (
                                    <Link href="/category/shop" className="py-2 px-4 bg-main text-white rounded-md font-medium text-sm">
                                        View More
                                    </Link>
                                )
                            }
                        </div>
                    </Container>
                </section>
            }
            {data.getSectionProducts.length > 4 && data.getSectionProducts[4].products.length > 0 &&
                <section>
                    <Container className="py-12">
                        <Header
                            section={data.getSectionProducts[4].section}
                        />
                        <div className="grid grid-cols-5 gap-6 mt-12">
                            {data.getSectionProducts[4].products.map((item, i) => (
                                <Link href={`/product/${slugify(item.name, { lower: true })}-${item.id}`} key={i}>
                                    <ProductCard product={item} />
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            {data.getSectionProducts[4].section.base === "category" ?
                                (<Link href="/" className="py-2 px-4 bg-main text-white rounded-md font-medium text-sm">
                                    View More
                                </Link>) : (
                                    <Link href="/category/shop" className="py-2 px-4 bg-main text-white rounded-md font-medium text-sm">
                                        View More
                                    </Link>
                                )
                            }
                        </div>
                    </Container>
                </section>
            }
            {
                data.getSectionProducts.length > 5 && data.getSectionProducts[5].products.length > 0 &&
                <section>
                    <Container className="py-12">
                        <Header
                            section={data.getSectionProducts[5].section}
                        />
                        <div className="grid grid-cols-5 gap-6 mt-12">
                            {data.getSectionProducts[5].products.map((item, i) => (
                                <Link href={`/product/${slugify(item.name, { lower: true })}-${item.id}`} key={i}>
                                    <ProductCard product={item} />
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            {data.getSectionProducts[5].section.base === "category" ?
                                (<Link href="/" className="py-2 px-4 bg-main text-white rounded-md font-medium text-sm">
                                    View More
                                </Link>) : (
                                    <Link href="/category/shop" className="py-2 px-4 bg-main text-white rounded-md font-medium text-sm">
                                        View More
                                    </Link>
                                )
                            }
                        </div>
                    </Container>
                </section>
            }
        </Fragment>
    );
};

export default SectionTwo;