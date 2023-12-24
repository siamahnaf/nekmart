import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import Add from "@/Components/Campaign/Add";
import Lists from "@/Components/Campaign/Lists";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";
import { GET_CAMPAIGN } from "@/Urql/Query/Campaign/flash.query";

const Home = () => {
    return (
        <Layout title="Flash Sale" active="flash">
            <Add />
            <Lists />
        </Layout>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    //Urql
    const { client, ssrCache } = initUrqlClient();

    //Headers
    const fetchOptions = {
        headers: {
            cookie: ctx.req.headers.cookie as string
        }
    };

    //Queries
    const { data } = await client.query(
        GET_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    if (!data || data?.getProfile.role !== "seller") {
        return { redirect: { destination: "/login-to-seller", permanent: false } }
    }

    //--//
    await client.query(
        GET_SELLER_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    await client.query(
        GET_CAMPAIGN, { searchInput: { page: 1, limit: 20 } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}