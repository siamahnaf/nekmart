import type { GetServerSideProps } from "next";

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
                <h4 className="text-lg font-bold mb-2"> রিটার্ন পলিসিঃ</h4>
                <p className="text-[15px]"> পেমেন্ট করা অর্ডার এর প্রোডাক্ট যদি স্টক না থাকে বা কোন প্রোডাক্ট এর প্রবলেম এর কারণে রিটার্ন করা হলে অথবা একাধিক প্রোডাক্ট এর মধ্যে থেকে কোন একটি প্রোডাক্ট স্টক না থাকলে এবং স্বল্পতম সময়ে প্রোডাক্ট স্টকে আসার সম্ভাবনা না থাকলে পেমেন্ট রিফান্ড করে দেয়া হয়।</p>
                <br />

                <h4 className="text-lg font-bold mb-3">রিফান্ডের জন্য প্রয়োজনীয় সময়ঃ</h4>
                <p className="text-[15px]">রিফান্ড রিকোয়েস্ট এর ডেট থেকে ১০-১৫ Working দিনের মধ্যে যে মাধ্যমে পেমেন্ট করা হয়েছে সেই মাধ্যমেই রিফান্ড করা হবে। প্রোডাক্ট রিফান্ড করতে আমাদের সাথে যোগাযোগ করুন : ০১৬৮৩৮৩৮৩৮৪ or support@nekmart.com</p>
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