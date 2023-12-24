import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import UpdatePassword from "@/Components/Profile/Password";
import UpdateProfile from "@/Components/Profile/update";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";

const Profile = () => {
    return (
        <Layout title="Profile" active="profile">
            <UpdateProfile />
            <UpdatePassword />
        </Layout>
    );
};

export default Profile;

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

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}