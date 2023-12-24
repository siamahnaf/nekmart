import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import Statics from "@/Components/Withdraw/Statics";
import ProcessingWithdraw from "@/Components/Withdraw/ProcessingWithdraw";
import IncomeList from "@/Components/Withdraw/IncomeList";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";
import { GET_INCOME_STATISTIC, GET_INCOME_HISTORY, GET_PROCESSING_WITHDRAW } from "@/Urql/Query/Withdraw/withdraw.query";

const MoneyWithdraw = () => {
    return (
        <Layout title="Money Withdraw" active="money">
            <Statics />
            <ProcessingWithdraw />
            <IncomeList />
        </Layout>
    );
};

export default MoneyWithdraw;

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
    const { data: sellerProfile } = await client.query(
        GET_SELLER_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    await client.query(
        GET_INCOME_STATISTIC, { sellerId: sellerProfile?.getSellerProfile.id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    await client.query(
        GET_INCOME_HISTORY, { searchInput: { page: 1, limit: 20 } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    await client.query(
        GET_PROCESSING_WITHDRAW, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}