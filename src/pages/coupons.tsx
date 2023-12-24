import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import AddItem from "@/Components/Common/AddItem";
import Lists from "@/Components/Coupons/Lists";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_COUPONS } from "@/Urql/Query/Coupons/coupon.query";

const Coupons = () => {
    return (
        <Layout title="coupon" active="coupon">
            <AddItem title="Coupon" url="/coupons/create-coupon" name="Create new coupon" />
            <Lists />
        </Layout>
    );
};

export default Coupons;

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
        GET_COUPONS, { searchInput: { page: 1, limit: 20 } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}