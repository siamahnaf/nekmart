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
            <Container className="py-8">
                <h4 className="text-lg font-bold mb-3">How much cost for EMI ?</h4>
                <ul className="list-disc ml-5">
                    <li>3% interest for 3 months EMI.</li>
                    <li>4.5% interest for 6 months EMI.</li>
                    <li>8% interest for 12 months EMI.</li>
                </ul>
                <br />
                <h4 className="text-lg font-bold mb-3">Which Bank Avail For EMI ?</h4>
                <Image src="/Emi.jpg" alt="sdf" width={1024} height={576} />
                <br />
                <h4 className="text-lg font-bold mb-3"> How to Avail EMI ?</h4>
                <ul>
                    <li className="mb-1.5"><span className="font-bold">Step-1:</span> Enter your card details</li>
                    <li className="mb-1.5"><span className="font-bold">Step-2:</span> Click on ‘Avail EMI’</li>
                    <li className="mb-1.5"><span className="font-bold">Step-3:</span> Choose preferred tenure</li>
                    <li className="mb-1.5"><span className="font-bold">Step-4:</span> Click on ‘Pay’</li>
                    <li className="mb-1.5"><span className="font-bold">Step-5:</span> Enter OTP sent by bank</li>
                    <li className="mb-1.5"><span className="font-bold">Step-6:</span> Payment Successful</li>
                </ul>
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