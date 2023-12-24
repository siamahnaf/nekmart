import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import DashboardLayout from "@/Components/Dashboard/Layout";
import Container from "@/Components/Common/Container";
import RefundableList from "@/Components/Dashboard/Components/Refund/RefundableList";
import RefundList from "@/Components/Dashboard/Components/Refund/RefundList";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";
import { GET_REFUNDABLE_PRODUCTS, GET_REFUND_PRODUCT } from "@/Urql/Query/Refund/refund.query";

const RefundRequest = () => {
    return (
        <Layout>
            <Container className="py-12">
                <DashboardLayout active="refund">
                    <RefundableList />
                    <RefundList />
                </DashboardLayout>
            </Container>
        </Layout>
    );
};

export default RefundRequest;

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
    //Common Queries
    await client.query(
        GET_SETTINGS, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    await client.query(
        GET_RUNNING_FLASH, { searchInput: { page: 1, limit: 50 } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //---//
    const { data } = await client.query(
        GET_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    if (!data) {
        return { redirect: { destination: "/account/login", permanent: false } }
    }

    //In Page Queries
    await client.query(
        GET_REFUNDABLE_PRODUCTS, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //In Page Queries
    await client.query(
        GET_REFUND_PRODUCT, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}