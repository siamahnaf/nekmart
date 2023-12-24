import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import Create from "@/Components/Tags/Create";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";

const Tag = () => {
    return (
        <Layout title="Tag" active="tag">
            <Create />
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

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}