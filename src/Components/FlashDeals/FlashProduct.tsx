import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

//Components
import Container from "../Common/Container";
import ProductCard from "../Common/ProductCard";
import Pagination from "../Common/Pagination";

//Urql
import { useQuery } from "urql";
import { GET_FLASH_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GetFlashProduct } from "@/Urql/Types/Products/product.types";

const FlashProduct = () => {
    //Initializing Hooks
    const router = useRouter();

    //State
    const [page, setPage] = useState<number>(1);

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data, error }] = useQuery<GetFlashProduct>({ query: GET_FLASH_PRODUCT, variables: { searchInput: { page: page, limit: 10 }, flashId: id } });

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
            <Container className="pb-16">
                {data.getFlashProduct.results.length === 0 &&
                    <div>
                        <Image src="/not-found.png" width={1000} height={1000} alt="Not found" className="w-[400px] mx-auto" />
                    </div>
                }
                <div className="grid grid-cols-5 gap-6">
                    {data.getFlashProduct.results.map((item, i) => (
                        <Link href={`/product/${slugify(item.name, { lower: true })}-${item.id}`} key={i}>
                            <ProductCard product={item} />
                        </Link>
                    ))}
                </div>
                <Pagination
                    totalPages={data?.getFlashProduct?.meta?.totalPages as number}
                    currentPage={data?.getFlashProduct?.meta?.currentPage as number}
                    onChange={(e) => setPage(e)}
                />
            </Container>
        </section>
    );
};

export default FlashProduct;