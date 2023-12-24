import type { GetServerSideProps } from "next";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import omitEmpty from "omit-empty-es";
import { useRouter } from "next/router";

//Components
import Layout from "@/Layout";
import { Notification } from "@/Components/Common/Notification";
import ProductInformation from "@/Components/products/create/ProductInformation";
import ProductMedia from "@/Components/products/create/ProductMedia";
import FlashSale from "@/Components/products/create/FlashSale";
import ProductVariation from "@/Components/products/create/ProductVariation";
import ProductPrice from "@/Components/products/create/ProductPrice";
import ProductDescription from "@/Components/products/create/ProductDescription";
import Specification from "@/Components/products/create/Specification";
import ProductSeo from "@/Components/products/create/ProductSeo";
import ProductSettings from "@/Components/products/create/ProductSettings";
import Disclaimer from "@/Components/products/create/Disclaimer";
import ProductTax from "@/Components/products/create/ProductTax";

//Context
import { productContext, Inputs } from "@/Context/product.context";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { useMutation } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";
import { ADD_PRODUCT } from "@/Urql/Query/Products/product.query";
import { AddProductData } from "@/Urql/Types/Products/product.types";

const Product = () => {
    //Initialize Hook
    const router = useRouter()

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, fetching, error }, mutate] = useMutation<AddProductData>(ADD_PRODUCT);

    //Form Initializing
    const {
        register,
        formState: { errors },
        control,
        setValue,
        getValues,
        watch,
        handleSubmit
    } = useForm<Inputs>({
        defaultValues: {
            disclaimer: "The actual color of the physical product may slightly vary due to the deviation of lighting sources, photography or your device display settings. Delivery charges may vary as per the location, Product Size and Weight; we will notify before proceeding the delivery."
        }
    });

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //Form Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const formData = {
            ...value,
            attributes: {
                attributeIds: value.attributes?.attributeIds?.map((item) => item.value),
                selectedVariant: value.attributes?.selectedVariant?.map((item) => {
                    return {
                        id: item.id,
                        selected: item.selected?.map(select => select.value)
                    }
                }),
                attributes: value.attributes?.attributes
            },
            sub_category: value.sub_category?.map(item => item.value),
            tag: value.tag?.map(item => item.value),
        }
        mutate({ productInput: omitEmpty(formData) }).then(({ data }) => {
            setNotification(true)
            if (data?.addProduct.success) {
                router.push("/products")
            }
        }).catch(() => {
            setNotification(true)
        })
    };

    return (
        <Layout title="Products" active="product">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.addProduct.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Create new product</h6>
            <productContext.Provider value={{ register, errors, setValue, watch, getValues, control }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-9">
                            <ProductInformation />
                            <ProductMedia />
                            <FlashSale />
                            <ProductVariation />
                            <ProductPrice />
                            <ProductDescription />
                            <Specification />
                            <ProductSeo />
                        </div>
                        <div className="col-span-3">
                            <ProductSettings />
                            <Disclaimer />
                            <ProductTax />
                        </div>
                    </div>
                    <div className="mt-8">
                        <button className="bg-main uppercase font-semibold py-3 text-white px-5 rounded-md text-sm relative" type="submit" disabled={fetching}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Save Product</span>
                            <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                {fetching &&
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                }
                            </div>
                        </button>
                    </div>
                </form>
            </productContext.Provider>
        </Layout>
    );
};

export default Product;

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
    if (!data || data?.getProfile.role !== "seller") {
        return { redirect: { destination: "/login-to-seller", permanent: false } }
    }

    //--//
    await client.query(
        GET_SELLER_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}