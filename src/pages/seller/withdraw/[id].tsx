import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import Statics from "@/Components/Withdraw/Statics";
import WithdrawHistory from "@/Components/Withdraw/WithdrawHistory";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_INCOME_STATISTIC } from "@/Urql/Query/Withdraw/withdraw.query";
import { GET_PREVIOUS_WITHDRAW } from "@/Urql/Query/Withdraw/withdraw.query";
import { GET_PLATFORM } from "@/Urql/Query/Platform/platform.query";

const Withdraw = () => {
    return (
        <Layout title="Seller" active="seller">
            <Statics />
            <WithdrawHistory />
        </Layout>
    );
};

export default Withdraw;

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
    if (!data || (data?.getProfile.role !== "admin")) {
        return { redirect: { destination: "/login-to-dashboard", permanent: false } }
    }

    //--//
    await client.query(
        GET_INCOME_STATISTIC, { sellerId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    await client.query(
        GET_PREVIOUS_WITHDRAW, { sellerId: id, searchInput: { page: 1, limit: 20 } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    await client.query(
        GET_PLATFORM, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}