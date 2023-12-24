import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import ForgetForm from "@/Components/Account/ForgetForm";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";

const ForgetPassword = () => {
    return (
        <Layout>
            <ForgetForm />
        </Layout>
    );
};

export default ForgetPassword;

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

    //Conditions
    if (data) {
        return { redirect: { destination: "/", permanent: false } }
    }

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}