import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import AddItem from "@/Components/Common/AddItem";
import Lists from "@/Components/RootCategories/Lists";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_MAIN_CATEGORIES } from "@/Urql/Query/RootCategories/root.query";

const RootCategory = () => {
    return (
        <Layout title="Root Category" active="rootCategory">
            <AddItem title="Root Category" url="/root-categories/create-category" name="Create new category" />
            <Lists />
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

    //--//
    await client.query(
        GET_MAIN_CATEGORIES, { searchInput: { page: 1, limit: 20 } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}