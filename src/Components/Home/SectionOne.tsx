import { Fragment } from "react";
import Link from "next/link";

//Components
import Container from "../Common/Container";
import Carousel from "./Products/Carousel";
import Header from "./Products/Header";

//Urql
import { useQuery } from "urql";
import { GET_SECTIONS } from "@/Urql/Query/Home/home.query";
import { GetSectionData } from "@/Urql/Types/Home/home.types";

const SectionOne = () => {
    //Urql
    const [{ data }] = useQuery<GetSectionData>({ query: GET_SECTIONS });

    if (!data) return null;

    return (
        <Fragment>
            {data.getSectionProducts.length > 0 && data.getSectionProducts[0].products.length > 0 &&
                <section>
                    <Container className="py-12">
                        <Header
                            section={data.getSectionProducts[0].section}
                        />
                        <Carousel products={data.getSectionProducts[0].products} />
                        <div className="text-center mt-8">
                            {data.getSectionProducts[0].section.base === "category" ?
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
            {data.getSectionProducts.length > 1 && data.getSectionProducts[1].products.length > 0 &&
                <section>
                    <Container className="py-12">
                        <Header
                            section={data.getSectionProducts[1].section}
                        />
                        <Carousel products={data.getSectionProducts[1].products} />
                        <div className="text-center mt-8">
                            {data.getSectionProducts[1].section.base === "category" ?
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
                data.getSectionProducts.length > 2 && data.getSectionProducts[2].products.length > 0 &&
                <section>
                    <Container className="py-12">
                        <Header
                            section={data.getSectionProducts[2].section}
                        />
                        <Carousel products={data.getSectionProducts[2].products} />
                        <div className="text-center mt-8">
                            {data.getSectionProducts[2].section.base === "category" ?
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

export default SectionOne;