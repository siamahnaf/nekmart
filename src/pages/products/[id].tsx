import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

//Components
import Layout from "@/Layout";
import BasicInformation from "@/Components/Products/Details/BasicInformation";
import ProductPrice from "@/Components/Products/Details/ProductPrice";
import SellerInformation from "@/Components/Products/Details/SellerInformation";
import ProductDescription from "@/Components/Products/Details/ProductDescription";
import ProductVideo from "@/Components/Products/Details/ProductVideo";
import ProductMeta from "@/Components/Products/Details/ProductMeta";
import ProductSettings from "@/Components/Products/Details/ProductSettings";
import Approved from "@/Components/Products/Details/Approved";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Product/product.query";
import { GetSingleProductData } from "@/Urql/Types/Product/product.types";

const Products = () => {
    //Initialize Hook
    const router = useRouter();

    //Getting Id
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ error, data }] = useQuery<GetSingleProductData>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    if (error) return (
        <p className="text-center font-semibold mt-4 text-main">There is no data matched!</p>
    )

    return (
        <Layout title="Products" active="product">
            <h6 className="font-bold text-lg mb-8">Product Details</h6>
            <BasicInformation />
            <ProductPrice />
            <SellerInformation />
            <ProductDescription />
            <ProductVideo />
            <ProductMeta />
            <ProductSettings />
            <Approved id={id} approved={data?.getProduct.is_approved || false} />
        </Layout>
    );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    //Urql
    const { client, ssrCache } = initUrqlClient();

    //Headers
    const fetchOptions = {
        headers: {
            cookie: ctx.req.headers.cookie as string
        }
    };

    //ID
    const parts = ctx.query && ctx.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

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
        GET_SINGLE_PRODUCT, { getProductId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}