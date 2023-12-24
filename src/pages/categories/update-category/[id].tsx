import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import Edit from "@/Components/Categories/Edit";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_SINGLE_CATEGORY } from "@/Urql/Query/Categories/category.query";
import { GET_MAIN_CATEGORIES } from "@/Urql/Query/RootCategories/root.query";

const Category = () => {
    return (
        <Layout title="Category" active="category">
            <Edit />
        </Layout>
    );
};

export default Category;

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
        GET_SINGLE_CATEGORY, { getCategoryId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    await client.query(
        GET_MAIN_CATEGORIES, { searchInput: { limit: 20, page: 1, search: "" } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}