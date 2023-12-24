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
                <h4 className="text-lg font-bold mb-2">রিটার্ন পলিসিঃ</h4>
                <p className="text-sm">
                    আপনার প্রতিটি কেনাকাটা এবং প্রতিটি প্রোডাক্ট যাতে সঠিক থাকে, আমরা সেই লক্ষেই কাজ করে যাচ্ছি। এর পরেও যদি কোন কারণে প্রোডাক্টে কোন ম্যানুফ্যাকচারিং ফল্ট থাকে বা প্রোডাক্ট হাতে পাবার পর প্রোডাক্ট কাজ না করে, কালার বা সাইজ অর্ডার করা পণ্যের থেকে ভিন্ন হয় সেক্ষেত্রে পণ্য এক্সচেঞ্জ বা রিটার্ন করার সুযোগ রয়েছে। প্রোডাক্ট মিসিং বা ভিন্ন প্রোডাক্ট কমপ্লেইন করার ক্ষেত্রে অবশ্যই ডেলিভারি এর সময় ডেলিভারি ম্যান এর সামনে প্রোডাক্ট বুঝে নিন অথবা অবশ্যই আনবক্সিং ভিডিও ধারণ করতে হবে। আনবক্সিং ভিডিও ধারণ ছাড়া প্যাকেজে প্রোডাক্ট মিসিং, প্রোডাক্ট কুরিয়ারে ভেঙ্গেছে বা প্রোডাক্ট ডিফারেন্ট এই ধরনের ইস্যু গ্রহণযোগ্য নয়- তাই ভুল বুঝাবুঝি রোধ কল্পে অবশ্যই প্রোডাক্ট আনবক্সিং ভিডিও ধারণ করার অনুরোধ করা যাচ্ছে।
                </p>
                <h6 className="text-base font-bold my-4">যে সকল ক্ষেত্রে রিটার্ন, এক্সচেঞ্জ, ওয়ারেন্টি এবং রিফান্ড প্রযোজ্য হবে না তার লিস্ট নিচে দেয়া হলো</h6>
                <ol className="mb-5 text-sm">
                    <li>1. ক্লিয়ারেন্স সেলের প্রোডাক্ট</li>
                    <li>2. যেকোনো গিফট আইটেম বা পুরষ্কার যা বিনামূল্যে দেয়া হয়েছে</li>
                    <li>3. প্রোডাক্টে কোন স্ক্র্যাচ বা দাগ বা রিসেলেবল কন্ডিশনে না থাকলে</li>
                </ol>
                <p className="text-sm">
                    কোন প্রোডাক্ট রিটার্ন করা প্রয়োজন হলে অবশ্যই এর সাথে প্রদত্ত সকল ধরনের পেপার, বক্স, এক্সেসরিস, ওয়ারেন্টি কার্ড, স্টিকার, লেবেল, গিফট আইটেম ইত্যাদি সহ প্রপারলি বক্স করে বা আলাদা ব্যাগের মধ্যে দিয়ে (কোনভাবেই প্রোডাক্ট এর বক্সে টেপ লাগানো যাবেনা) আমাদের অফিসের ঠিকানায় কুরিয়ার করতে হবে ।প্রোডাক্ট এর কোন ফল্ট থাকলে তার জন্য ডেলিভারি চার্জ আমরা বহন করবো
                </p>
                <br />
                <p className="text-sm">
                    প্রোডাক্ট রিটার্ন করলে অবশ্যই প্রোডাক্ট পুনরায় বিক্রি যোগ্য অবস্থায় থাকতে হবে, কোন পার্টস মিসিং হলে বা বক্স ক্ষতিগ্রস্ত হলে প্রোডাক্ট রিটার্ন রিসিভ করা হবেনা। সব কিছু ঠিক থাকলে প্রোডাক্ট রিসিভ করার পর প্রোডাক্ট চেক করে সব ঠিক থাকলে এর পর ১০-১৫ Working দিনের মধ্যে রিফান্ড এর ব্যাবস্থা নেয়া হবে।
                </p>
                <br />
                <p className="text-sm">
                    প্রোডাক্ট রিটার্ন করতে আমাদের সাথে যোগাযোগ করুন : ০১৬৮৩৮৩৮৩৮৪ or support@nekmart.com
                </p>
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