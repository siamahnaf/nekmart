import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import slugify from "slugify";
import Link from "next/link";

//Components
import Container from "../Common/Container";
import ProductCard from "../Common/ProductCard";
import Pagination from "../Common/Pagination";

//Urql
import { useQuery } from "urql";
import { GET_PRODUCT_BY_SELLER } from "@/Urql/Query/Products/product.query";
import { GetProductBySeller } from "@/Urql/Types/Products/product.types";

const SellerProduct = () => {
    //Initializing Hooks
    const router = useRouter();

    //State
    const [page, setPage] = useState<number>(1);

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data, error }] = useQuery<GetProductBySeller>({ query: GET_PRODUCT_BY_SELLER, variables: { searchInput: { page: page, limit: 20 }, getProductBySellerId: id } })

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
            <Container className="py-12">
                {data.getProductBySeller.results.length === 0 &&
                    <div>
                        <Image src="/not-found.png" width={1000} height={1000} alt="Not found" className="w-[400px] mx-auto" />
                    </div>
                }
                <div className="grid grid-cols-5 gap-6">
                    {data.getProductBySeller.results.map((item, i) => (
                        <Link href={`/product/${slugify(item.name, { lower: true })}-${item.id}`} key={i}>
                            <ProductCard product={item} />
                        </Link>
                    ))}
                </div>
                <Pagination
                    totalPages={data?.getProductBySeller?.meta?.totalPages as number}
                    currentPage={data?.getProductBySeller?.meta?.currentPage as number}
                    onChange={(e) => setPage(e)}
                />
            </Container>
        </section>
    );
};

export default SellerProduct;