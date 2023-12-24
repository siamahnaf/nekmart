import type { GetServerSideProps } from "next";
import Image from "next/image";

//Components
import Layout from "@/Layout";
import Container from "@/Components/Common/Container";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";

const PreOrder = () => {
    return (
        <Layout>
            <Container className="pt-12 pb-24">
                <div className="text-center">
                    <Image src="/thanks.png" alt="Thanks" width={280} height={230} className="mx-auto" />
                    <h4 className="text-5xl font-semibold mt-10 text-green-600">YOUR PRE-ORDER IS SUCCESSFUL</h4>
                    <p className="text-xl mt-5 text-green-600">আমাদের একজন প্রতিনিধি আপনাকে কল করবে অর্ডারটি কনফার্ম করতে অথবা এই প্রি-অর্ডারের বিষয়ে ইনফর্ম করতে।</p>
                </div>
            </Container>
        </Layout>
    );
};

export default PreOrder;

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

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}