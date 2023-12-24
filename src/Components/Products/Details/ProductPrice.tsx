import { useRouter } from "next/router";
import Image from "next/image";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Product/product.query";
import { GetSingleProductData } from "@/Urql/Types/Product/product.types";

const ProductPrice = () => {
    //Initialize Hook
    const router = useRouter();

    //Getting Id
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProductData>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Price & Attributes</h4>
            <div className="p-5 grid grid-cols-12 gap-7">
                <div className="col-span-3">
                    <h4 className="text-base font-semibold mb-2">Product Price</h4>
                    <hr />
                    <div className="mt-4">
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Price</span>: {data?.getProduct.price}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Quantity</span>: {data?.getProduct.quantity}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Discount</span>: {data?.getProduct.discount}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Discount Unit</span>: {data?.getProduct.discountUnit}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Tax</span>: {data?.getProduct.tax}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Tax Unit</span>: {data?.getProduct.taxUnit}</p>
                    </div>
                </div>
                <div className="col-span-9">
                    <h4 className="text-base font-semibold mb-2">Product Attributes</h4>
                    <hr />
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        {data && data.getProduct && data.getProduct.attributes && data.getProduct.attributes.attributes?.map((item, i) => (
                            <div key={i}>
                                {item.image &&
                                    <Image src={process.env.NEXT_PUBLIC_IMAGE_URL as string + item.image} alt={i.toString()} width={500} height={500} className="w-full rounded-md" />
                                }
                                <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Variant</span>: {item.variant}</p>
                                <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Quantity</span>: {item.quantity}</p>
                                <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Tax Unit</span>: ৳{item.price}</p>
                            </div>
                        ))}
                        {!data?.getProduct.attributes &&
                            <p className="text-main font-medium">No attributes</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPrice;