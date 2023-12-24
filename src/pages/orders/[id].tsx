import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import Details from "@/Components/Order/Details";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_SINGLE_ORDER } from "@/Urql/Query/Order/order.query";

const Orders = () => {
    return (
        <Layout title="Orders" active="order">
            <Details />
        </Layout>
    );
};

export default Orders;

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

    //--//
    await client.query(
        GET_SINGLE_ORDER, { getOrderId: ctx.query.id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}