import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import AddItem from "@/Components/Common/AddItem";
import Lists from "@/Components/Tags/Lists";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_TAGS } from "@/Urql/Query/Tags/tag.query";

const Tag = () => {
    return (
        <Layout title="Tag" active="tag">
            <AddItem title="Tags" url="/tags/create-tag" name="Create new tag" />
            <Lists />
        </Layout>
    );
};

export default Tag;

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
        GET_TAGS, { searchInput: { limit: 20, page: 1 } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}