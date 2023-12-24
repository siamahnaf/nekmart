import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import FlashDetails from "@/Components/FlashDeals/FlashDetails";
import FlashProduct from "@/Components/FlashDeals/FlashProduct";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GET_SINGLE_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GET_FLASH_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";

const FlashDeal = () => {
    return (
        <Layout title="Flash Deals">
            <FlashDetails />
            <FlashProduct />
        </Layout>
    );
};

export default FlashDeal;

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

    //In page Queries
    await client.query(
        GET_SINGLE_FLASH, { getFlashId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //In page Queries
    await client.query(
        GET_FLASH_PRODUCT, { searchInput: { page: 1, limit: 10 }, flashId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}