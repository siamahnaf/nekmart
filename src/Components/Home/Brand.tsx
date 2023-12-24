import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

//Components
import Container from "../Common/Container";

//Urql
import { useQuery } from "urql";
import { GET_BRANDS } from "@/Urql/Query/Brand/brand.query";
import { GetBrandData } from "@/Urql/Types/Brand/brand.types";

const Brand = () => {
    //Carousel
    const [emblaRef] = useEmblaCarousel({
        containScroll: "trimSnaps",
        dragFree: true
    }, [
        Autoplay({
            delay: 4000
        })
    ]);

    //Urql
    const [{ data }] = useQuery<GetBrandData>({ query: GET_BRANDS, variables: { searchInput: { page: 1, limit: 15 } } });

    return (
        <section>
            <Container className="py-16">
                <div className="text-center mb-12">
                    <h4 className="text-2xl font-semibold text-main">Brand</h4>
                    <p className="text-[15px] mt-2 font-light opacity-60">Top Brands</p>
                </div>
                {data && data.getBrands.results.length > 0 &&
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6">
                            {data.getBrands.results.map((item, i) => (
                                <div key={i} className="flex-[0_0_10%]">
                                    <Link href="/">
                                        {item.image ?
                                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item.image} alt={item.name} width={300} height={300} /> :

                                            <Image src="/placeholder-300.png" alt={item.name} width={300} height={300} />
                                        }
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </Container>
        </section>
    );
};

export default Brand;