import type { GetServerSideProps } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

//Context
import { imageContext } from "@/Context/image.context";

//Components
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";
import Images from "@/Components/Product/Images";
import Breadcrumb from "@/Components/Product/Breadcrumb";
import Detail from "@/Components/Product/Detail";
import ProductInfo from "@/Components/Product/ProductInfo";
import Videos from "@/Components/Product/Videos";
import SellingProduct from "@/Components/Product/SellingProduct";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { useQuery } from "urql";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GetSingleProduct } from "@/Urql/Types/Products/product.types";
import { GET_SELLING_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";
import { CHECK_WISHLIST } from "@/Urql/Query/Wishlist/wishlist.query";
import { GET_REVIEWS } from "@/Urql/Query/Review/review.query";

const Product = () => {
    //Initializing Hook
    const router = useRouter();

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data, error }] = useQuery<GetSingleProduct>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    //State
    const [selected, setSelected] = useState<string>(data?.getProduct.images[0] as string || "");

    //Error Return
    if (error) {
        return (
            <Layout title="Product not found!">
                <p className="text-center font-semibold my-10 text-main">{error.message}</p>
            </Layout>
        )
    }

    return (
        <Layout title={data?.getProduct.name}>
            <Container>
                <Breadcrumb />
                <imageContext.Provider value={{ selected, setSelected }}>
                    <div className="grid grid-cols-2 gap-5">
                        <Images />
                        <Detail />
                    </div>
                </imageContext.Provider>
                <ProductInfo />
                <Videos />
                <SellingProduct />
            </Container>
        </Layout>
    );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    //Urql
    const { client, ssrCache } = initUrqlClient();

    //Headers
    const fetchOptions = {
        headers: {
            cookie: ctx.req.headers.cookie as string
        }
    };

    //ID
    const parts = ctx.query && ctx.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Queries
    //Common Queries
    await client.query(
        GET_SETTINGS, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    await client.query(
        GET_RUNNING_FLASH, { searchInput: { page: 1, limit: 50 } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //---//
    await client.query(
        GET_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //In Page Queries
    await client.query(
        GET_SINGLE_PRODUCT, { getProductId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //In Page Queries
    await client.query(
        GET_SELLING_PRODUCT, { getSellingProductId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //In Page Queries
    await client.query(
        CHECK_WISHLIST, { productId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //In Page Queries
    await client.query(
        GET_REVIEWS, { productId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}