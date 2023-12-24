import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";
import Success from "@/Components/Order/Success";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";
import { GET_ORDER } from "@/Urql/Query/Order/order.query";

const OrderSuccess = () => {
    return (
        <Layout>
            <Container className="py-8">
                <Success />
            </Container>
        </Layout>
    );
};

export default OrderSuccess;

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
    await client.query(
        GET_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //In page Query
    await client.query(
        GET_ORDER, { trackInput: { trackId: `NEK-${ctx.query.id}` } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}