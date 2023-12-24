import type { GetServerSideProps } from "next";
import Link from "next/link";

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
                <h4 className="text-xl font-bold mb-3">Privacy Policy</h4>
                <p><Link href="https://nekmart.com" className="underline">www.nekmart.com</Link> website is owned by nekmart, which is a data controller of your personal data.</p>
                <br />
                <p>We have adopted this Privacy Policy, which determines how we are processing the information collected by www.nekmart.com, which also provides the reasons why we must collect certain personal data about you. Therefore, you must read this Privacy Policy before using www.nekmart.com website.</p>
                <br />

                <p>We take care of your personal data and undertake to guarantee its confidentiality and security.</p>
                <br />
                <h4 className="text-base font-bold">Personal information we collect:</h4>
                <br />
                <p>When you visit the www.nekmart.com, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the installed cookies on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products you view, what websites or search terms referred you to the Site, and how you interact with the Site. We refer to this automatically-collected information as “Device Information.” Moreover, we might collect the personal data you provide to us (including but not limited to Name, Surname, Address, payment information, etc.) during registration to be able to fulfill the agreement.</p>
                <br />

                <h4 className="text-base font-bold">Why do we process your data?</h4>
                <br />
                <p>Our top priority is customer data security, and, as such, we may process only minimal user data, only as much as it is absolutely necessary to maintain the website. Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding website usage. This statistical information is not otherwise aggregated in such a way that it would identify any particular user of the system.</p>
                <br />

                <p>You can visit the website without telling us who you are or revealing any information, by which someone could identify you as a specific, identifiable individual. If, however, you wish to use some of the website’s features, or you wish to receive our newsletter or provide other details by filling a form, you may provide personal data to us, such as your email, first name, last name, city of residence, organization, telephone number. You can choose not to provide us with your personal data, but then you may not be able to take advantage of some of the website’s features. For example, you won’t be able to receive our Newsletter or contact us directly from the website. Users who are uncertain about what information is mandatory are welcome to contact us via support@nekmart.com.</p>
                <br />
                <h4 className="font-bold">Your rights:</h4>
                <br />
                <p>If you are a European resident, you have the following rights related to your personal data:</p>
                <br />
                <ul className="list-disc ml-5">
                    <li>The right to be informed.</li>
                    <li>The right of access.</li>
                    <li>The right to rectification.</li>
                    <li>The right to erasure.</li>
                    <li>The right to restrict processing.</li>
                    <li>The right to data portability.</li>
                    <li>The right to object.</li>
                    <li>Rights in relation to automated decision-making and profiling.</li>
                </ul>
                <br />
                <p>If you would like to exercise this right, please contact us through the contact information below.</p>
                <br />

                <p>Additionally, if you are a European resident, we note that we are processing your information in order to fulfill contracts we might have with you (for example, if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information might be transferred outside of Europe, including Canada and the United States.</p>
                <br />

                <h4 className="font-bold">Links to other websites:</h4>
                <br />
                <p> Our website may contain links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for such other websites or third parties&apos; privacy practices. We encourage you to be aware when you leave our website and read the privacy statements of each website that may collect personal information.</p>
                <br />

                <h4 className="font-bold">Information security:</h4>
                <br />
                <p>We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We keep reasonable administrative, technical, and physical safeguards to protect against unauthorized access, use, modification, and personal data disclosure in its control and custody. However, no data transmission over the Internet or wireless network can be guaranteed.</p>
                <br />

                <h4 className="font-bold">Legal disclosure:</h4>
                <br />
                <p>We will disclose any information we collect, use or receive if required or permitted by law, such as to comply with a subpoena or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.</p>
                <br />

                <h4 className="font-bold">Contact information</h4>
                <br />
                <p>If you would like to contact us to understand more about this Policy or wish to contact us concerning any matter relating to individual rights and your Personal Information, you may send an email to support@nekmart.com.</p>
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