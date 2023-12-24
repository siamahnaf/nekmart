import { useState } from "react";
import { Rating } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { Icon } from "@iconify/react";

//Components
import Container from "../Common/Container";
import Pagination from "../Common/Pagination";

//Urql
import { useQuery } from "urql";
import { GET_SELLER } from "@/Urql/Query/Seller/seller.query";
import { GetSellerData } from "@/Urql/Types/Seller/seller.types";

const SellerCard = () => {
    //State
    const [page, setPage] = useState<number>(1);

    //Urql
    const [{ data, error }] = useQuery<GetSellerData>({ query: GET_SELLER, variables: { searchInput: { page: page, limit: 20 } } });

    //Error Return
    if (error) {
        return (
            <p className="text-center text-main font-semibold mt-16">{error.message}</p>
        )
    }

    //Not Data Return
    if (!data) {
        return null
    }
    return (
        <section>
            <Container className="py-14">
                <h3 className="text-center font-semibold mb-8 text-2xl">All Shop</h3>
                <div className="grid grid-cols-5 gap-6">
                    {data.getSellers.results.map((item, i) => (
                        <div key={i} className="border border-solid border-gray-300 p-5 text-center">
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item.logo} alt={item.shopName} width={300} height={300} className="w-full rounded-md" />
                            <p className="text-lg text-center font-bold mt-2 mb-3">{item.shopName}</p>
                            <Rating
                                value={item.totalRating / item.totalReview}
                                readonly
                                unratedIcon={<Icon className="text-sm" icon="eva:star-outline" />}
                                ratedIcon={<Icon className="text-sm" icon="eva:star-fill" />}
                            />
                            <Link href={`/shop/${slugify(item.shopName, { lower: true })}-${item.id}`} key={i} className="block w-full bg-main py-2 text-center text-white text-sm rounded-md font-medium mt-2">
                                Visit store
                            </Link>
                        </div>
                    ))}
                </div>
                <Pagination
                    totalPages={data?.getSellers?.meta?.totalPages as number}
                    currentPage={data?.getSellers?.meta?.currentPage as number}
                    onChange={(e) => setPage(e)}
                />
            </Container>
        </section>
    );
};

export default SellerCard;