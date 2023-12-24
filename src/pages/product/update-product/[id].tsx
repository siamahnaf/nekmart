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
import Disclaimer from "@/Components/products/update/Disclaimer";
import ProductTax from "@/Components/products/create/ProductTax";

//Context
import { productContext, Inputs } from "@/Context/product.context";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { useMutation, useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";
import { GET_SINGLE_PRODUCT, UPDATE_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GetSingleProductData, UpdateProductData } from "@/Urql/Types/Products/product.types";

const Product = () => {
    //Initialize Hook
    const router = useRouter()

    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Finding the id
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }, refetch] = useQuery<GetSingleProductData>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } })
    const [{ data: updateData, fetching, error }, mutate] = useMutation<UpdateProductData>(UPDATE_PRODUCT);

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
            name: data?.getProduct.name,
            main_category: data?.getProduct.main_category.id,
            category: data?.getProduct.category?.id,
            sub_category: data?.getProduct.sub_category?.map(item => ({ label: item.name, value: item.id })),
            brand: data?.getProduct.brand?.id,
            unit: data?.getProduct.unit,
            minPurchase: data?.getProduct.minPurchase,
            tag: data?.getProduct.tag?.map(item => ({ label: item.name, value: item.id })),
            refundAble: data?.getProduct.refundAble,
            images: data?.getProduct.images,
            youtubeLink: data?.getProduct.youtubeLink,
            flash: data?.getProduct.flash?.id,
            price: data?.getProduct.price,
            quantity: data?.getProduct.quantity,
            discount: data?.getProduct.discount,
            discountUnit: data?.getProduct.discountUnit,
            attributes: {
                attributeIds: data?.getProduct.attributes?.attributeIds?.map(item => ({ label: item.name, value: item.id })),
                selectedVariant: data?.getProduct.attributes?.selectedVariant?.map(item => {
                    return {
                        id: item.id,
                        selected: item?.selected?.map(se => ({ label: se, value: se }))
                    }
                }),
                attributes: data?.getProduct.attributes?.attributes?.map((item) => {
                    return {
                        variant: item.variant,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image
                    }
                })
            },
            description: data?.getProduct.description,
            specification: data?.getProduct.specification?.map(item => ({ title: item.title, value: item.value })),
            visibility: data?.getProduct.visibility,
            meta: {
                title: data?.getProduct.meta?.title,
                description: data?.getProduct.meta?.description,
                image: data?.getProduct.meta?.image,
                metaTags: data?.getProduct.meta?.metaTags
            },
            estimateDelivery: data?.getProduct.estimateDelivery,
            warranty: data?.getProduct.warranty,
            showStock: data?.getProduct.showStock,
            tax: data?.getProduct.tax.toString(),
            taxUnit: data?.getProduct.taxUnit,
            disclaimer: data?.getProduct.disclaimer
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
        mutate({ productInput: omitEmpty(formData), updateProductId: id }).then(({ data }) => {
            setNotification(true)
            if (data?.updateProduct.success) {
                refetch({ requestPolicy: "network-only" })
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
                {error?.message ?? updateData?.updateProduct.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Update your products</h6>
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
    if (!data || data?.getProfile.role !== "seller") {
        return { redirect: { destination: "/login-to-seller", permanent: false } }
    }

    //--//
    await client.query(
        GET_SELLER_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    await client.query(
        GET_SINGLE_PRODUCT, { getProductId: id }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } }
}