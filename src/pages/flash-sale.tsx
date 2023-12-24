import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import AddItem from "@/Components/Common/AddItem";
import Lists from "@/Components/Flash/Lists";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_FLASHES } from "@/Urql/Query/Flash/flash.query";

const Brand = () => {
    return (
        <Layout title="Flash Sale" active="flash">
            <AddItem title="Flash Sale" url="/flash-sale/create-flash-sale" name="Create new flash-sale" />
            <Lists />
        </Layout>
    );
};

export default Brand;

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
        GET_FLASHES, { searchInput: { page: 1, limit: 20 } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}