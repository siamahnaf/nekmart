import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import SellerProfile from "@/Components/Seller/SellerProfile";
import SellerProduct from "@/Components/Seller/SellerProduct";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";
import { GET_SINGLE_SELLER } from "@/Urql/Query/Seller/seller.query";
import { GET_PRODUCT_BY_SELLER } from "@/Urql/Query/Products/product.query";

const ShopProduct = () => {
    return (
        <Layout>
            <SellerProfile />
            <SellerProduct />
        </Layout>
    );
};

export default ShopProduct;

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
        GET_SINGLE_SELLER, { getSellerId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //In Page Queries
    await client.query(
        GET_PRODUCT_BY_SELLER, { searchInput: { page: 1, limit: 20 }, getProductBySellerId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}