import { useRouter } from "next/router";
import Image from "next/image";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Product/product.query";
import { GetSingleProductData } from "@/Urql/Types/Product/product.types";

const BasicInformation = () => {
    //Initialize Hook
    const router = useRouter();

    //Getting Id
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProductData>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    return (
        <div className="border border-solid border-gray-200 rounded-md  mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Basic Information</h4>
            <div className="p-5">
                <div className="grid grid-cols-9 gap-2">
                    {data?.getProduct.images.map((item, i) => (
                        <div key={i}>
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item} alt={i.toString()} width={500} height={500} className="w-full rounded-md" />
                        </div>
                    ))}
                </div>
                <h4 className="text-xl font-semibold my-4">{data?.getProduct.name}</h4>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Main Category</span>: {data?.getProduct.main_category.name}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Category</span>: {data?.getProduct.category?.name}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Sub Category</span>: {data?.getProduct.sub_category?.map(item => item.name).join(", ")}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Brand</span>: {data?.getProduct.brand?.name}</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Unit</span>: {data?.getProduct.unit}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Minimum Purchase Qty</span>: {data?.getProduct.minPurchase}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Product Tags</span>: {data?.getProduct.tag?.map(item => item.name).join(", ")}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Refundable</span>: {data?.getProduct.refundAble ? "Yes" : "No"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicInformation;