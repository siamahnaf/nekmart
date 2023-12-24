import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";

//Components
import Container from "../Common/Container";

//Urql
import { useQuery } from "urql";
import { GET_SELLER } from "@/Urql/Query/Seller/seller.query";
import { GetSellerData } from "@/Urql/Types/Seller/seller.types";

const Shop = () => {
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
    const [{ data }] = useQuery<GetSellerData>({ query: GET_SELLER, variables: { searchInput: { page: 1, limit: 15 } } });

    return (
        <section>
            <Container className="py-16">
                <div className="text-center mb-12">
                    <h4 className="text-2xl font-semibold text-main">Shop</h4>
                    <p className="text-[15px] mt-2 font-light opacity-60">Top Shops</p>
                </div>
                {data && data.getSellers.results.length > 0 &&
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6">
                            {data.getSellers.results.map((item, i) => (
                                <div key={i} className="flex-[0_0_10%]">
                                    <Link href={`/shop/${slugify(item.shopName, { lower: true })}-${item.id}`}>
                                        {item.logo ?
                                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item.logo} alt={item.shopName} width={300} height={300} /> :

                                            <Image src="/placeholder-300.png" alt={item.shopName} width={300} height={300} />
                                        }
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                <div className="text-center mt-8">
                    <Link href="/shop" className="py-2 px-4 bg-main text-white rounded-md font-medium text-sm">
                        View More
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default Shop;