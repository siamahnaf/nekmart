import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import Create from "@/Components/RootCategories/Create";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";

const RootCategory = () => {
    return (
        <Layout title="Root Category" active="rootCategory">
            <Create />
        </Layout>
    );
};

export default RootCategory;

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
    if (!data || (data?.getProfile.role !== "moderator" && data?.getProfile.role !== "admin")) {
        return { redirect: { destination: "/login-to-dashboard", permanent: false } }
    }

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}