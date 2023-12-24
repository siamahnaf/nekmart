import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import Lists from "@/Components/Preorder/Lists";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_PRE_ORDER } from "@/Urql/Query/Preorder/preorder.query";

const Preorder = () => {
    return (
        <Layout title="Pre-order" active="preorder">
            <Lists />
        </Layout>
    );
};

export default Preorder;

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
    if (!data) {
        return { redirect: { destination: "/login-to-dashboard", permanent: false } }
    }

    //In Page Queries
    await client.query(
        GET_PRE_ORDER, { searchInput: { limit: 20, page: 1 } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}