import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import HomeLayout from "@/Components/Home/Layout";
import Add from "@/Components/Home/BannerTwo/Add";
import Lists from "@/Components/Home/BannerTwo/Lists";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_BANNER_TWO } from "@/Urql/Query/Home/banner-two.query";

const BannerTwo = () => {
    return (
        <Layout title="Home page" active="home">
            <HomeLayout active="bannerTwo">
                <Add />
                <Lists />
            </HomeLayout>
        </Layout>
    );
};

export default BannerTwo;

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
        GET_BANNER_TWO, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}