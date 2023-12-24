import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Context
import { imageContext } from "@/Context/image.context";

//Components
import Counter from "./Detail/Counter";
import WishButton from "./Detail/WishButton";
import CartButton from "./Detail/CartButton";
import BuyButton from "./Detail/BuyButton";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GET_REVIEWS } from "@/Urql/Query/Review/review.query";
import { GetSingleProduct } from "@/Urql/Types/Products/product.types";
import { GetReviewsData } from "@/Urql/Types/Review/review.types";

const Detail = () => {
    //Initializing Hooks
    const router = useRouter();

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProduct>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });
    const [{ data: review }] = useQuery<GetReviewsData>({ query: GET_REVIEWS, variables: { productId: id } })

    //State
    const [count, setCount] = useState<number>(Number(data?.getProduct.minPurchase));
    const [variant, setVariant] = useState<{ id: string, name: string, variant: string }[]>([]);
    const [updateInfo, setUpdateInfo] = useState<{ price: string, totalPrice: number, quantity: string } | null>({ price: data?.getProduct.price as string, totalPrice: Number(data?.getProduct.totalPrice), quantity: data?.getProduct.quantity as string });
    const [error, setError] = useState<string>("");

    //Context
    const { setSelected } = useContext(imageContext);

    // On Variant Select
    const onVariantSelect = (item: { id: string, name: string, variant: string }) => {
        const hasVariant = variant.find(s => s.id === item.id)
        if (!hasVariant) {
            setVariant((prev) => [...prev, item])
        } else {
            setVariant((prev) => {
                return prev.map((v) => {
                    if (v.id === item.id) {
                        return { ...v, variant: item.variant };
                    } else {
                        return v;
                    }
                });
            });
        }
    };

    //UseEffect
    useEffect(() => {
        if (data?.getProduct?.attributes) {
            const variantName = variant.map(n => n.variant).join("-");
            const normalizeString = (str: string) => str.split('').sort().join('');
            const normalizedVariant = normalizeString(variantName);
            const attributes = data.getProduct.attributes.attributes.find(a => {
                const normalizedAttribute = normalizeString(a.variant as string);
                return normalizedAttribute === normalizedVariant;
            });
            if (attributes) {
                let totalPrice;
                if (data.getProduct.discountUnit === "percent") {
                    totalPrice = Math.round(Number(attributes.price) - (Number(attributes.price) * (Number(data.getProduct.discount) / 100)));
                } else if (data.getProduct.discountUnit === "flat") {
                    totalPrice = Math.round(Number(attributes.price) - Number(data.getProduct.discount));
                }
                setUpdateInfo({ price: attributes.price as string, totalPrice: totalPrice as number, quantity: attributes.quantity as string })
                if (Number(attributes.quantity) < count) {
                    setCount(Number(attributes?.quantity))
                }
                setSelected?.(attributes.image as string || "")
            }
            setError("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant]);

    //Not Data return
    if (!data) return null;

    return (
        <div>
            <div className="flex gap-2 items-center">
                <h4 className="flex-1 text-2xl font-semibold">{data.getProduct.name}</h4>
                <WishButton />
            </div>
            <div className="my-2 flex gap-2">
                <p className="opacity-50 border-r border-solid border-gray-300 pr-2 text-[15px]">{review?.getReviewByProduct.length.toString().padStart(2, "0")} reviews</p>
                <p className="opacity-70 text-[15px]">sku: {data.getProduct.id}</p>
            </div>
            <div>
                <p className="text-sm mb-1.5">
                    <span className="font-semibold">Availability: </span>
                    <span className={`${Number(data.getProduct.quantity) > 0 ? "text-green-600" : "text-main"} font-semibold`}>{Number(data.getProduct.quantity) > 0 ? "In Stock" : "Out Of Stock"}</span>
                </p>
                <p className="text-sm mb-2">
                    <span className="font-semibold">Sold By: </span>
                    <span className="font-bold">{data.getProduct.seller.shopName}</span>
                </p>
                {data.getProduct.brand &&
                    <p className="text-sm mb-2">
                        <span className="font-semibold">Brand: </span>
                        <span className="font-bold">{data.getProduct.brand?.name}</span>
                    </p>
                }
                {data.getProduct.warranty &&
                    <p className="text-sm mb-2">
                        <span className="font-semibold">Warranty: </span>
                        <span className="font-bold">{data.getProduct.warranty}</span>
                    </p>
                }
                {data.getProduct.estimateDelivery &&
                    <p className="text-sm mb-2">
                        <span className="font-semibold">Delivery Time: </span>
                        <span className="font-bold">{data.getProduct.estimateDelivery} day(s)</span>
                    </p>
                }
                <p className="text-sm mb-2">
                    <span className="font-semibold">Minimum Purchase Qty: </span>
                    <span className="font-bold">{data.getProduct.minPurchase}</span>
                </p>
            </div>
            <div className="mt-4">
                {Number(updateInfo?.totalPrice) < Number(updateInfo?.price) &&
                    <h4 className="text-xl font-semibold opacity-50 line-through">৳{updateInfo?.price}<span className="text-base">/1</span></h4>
                }
                <h6 className="text-3xl text-main font-semibold mt-1.5">৳{updateInfo?.totalPrice}<span className="text-base font-medium text-black opacity-50 ml-2">/1</span></h6>
            </div>
            {data.getProduct.attributes &&
                <div>
                    {data.getProduct?.attributes?.selectedVariant?.map((item, i) => (
                        <div key={i} className="my-3">
                            <h4 className="font-semibold text-sm">{data.getProduct.attributes?.attributeIds.find(a => a.id === item.id)?.name}:</h4>
                            <div className="flex gap-2 mt-2">
                                {item.selected.map((v, vi) => (
                                    <button key={vi} className={`border border-solid border-main px-2.5 py-0.5 rounded ${variant.find(s => s.variant === v) ? "bg-main text-white" : ""}`} onClick={() => onVariantSelect({ id: item.id as string, name: data.getProduct.attributes?.attributeIds.find(a => a.id === item.id)?.name as string, variant: v })}>
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            }
            <div>
                <h4 className="font-semibold text-sm mb-2">Quantity:</h4>
                <div className="flex gap-3 items-center">
                    <Counter
                        value={count}
                        minimum={Number(data.getProduct.minPurchase)}
                        maximum={Number(updateInfo?.quantity)}
                        onChange={(e) => setCount(e)}
                    />
                    <h4>({updateInfo?.quantity} available)</h4>
                </div>
            </div>
            <hr className="py-2 mt-2" />
            <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">Total price:</h4>
                <h1 className="text-2xl font-semibold text-main">৳{Number(updateInfo?.totalPrice) * count}</h1>
            </div>
            <div>
                <CartButton
                    sellerId={data.getProduct.seller.id}
                    reserved={count}
                    attributes={variant}
                    minPurchase={data.getProduct.minPurchase as string}
                    onError={() => setError("Please select a variant!")}
                    hasAttributes={data.getProduct.attributes ? true : false}
                    attributeLength={data.getProduct.attributes?.selectedVariant.length || 1}
                />
                <BuyButton
                    sellerId={data.getProduct.seller.id}
                    reserved={count}
                    attributes={variant}
                    minPurchase={data.getProduct.minPurchase as string}
                    onError={() => setError("Please select a variant!")}
                    hasAttributes={data.getProduct.attributes ? true : false}
                    attributeLength={data.getProduct.attributes?.selectedVariant.length || 1}
                />
            </div>
            {error &&
                <p className="text-center mt-2 text-main font-semibold">Please select the variant!</p>
            }
        </div>
    );
};

export default Detail;