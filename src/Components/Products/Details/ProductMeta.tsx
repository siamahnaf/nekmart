import { useRouter } from "next/router";
import Image from "next/image";


//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Product/product.query";
import { GetSingleProductData } from "@/Urql/Types/Product/product.types";

const ProductMeta = () => {
    //Initialize Hook
    const router = useRouter();

    //Getting Id
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProductData>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    return (
        <div className="border border-solid border-gray-200 rounded-md  mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Meta Information</h4>
            <div className="p-5">
                {data?.getProduct.meta ?
                    <>
                        {data?.getProduct.meta?.image &&
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL as string + data.getProduct.meta.image} alt="Meta title" width={500} height={500} className="w-[200px] rounded-md" />
                        }
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px] mt-5"><span className="font-semibold">Meta title</span>: {data?.getProduct.meta?.title}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Meta Description</span>: {data?.getProduct.meta?.description}</p>
                        <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Meta tags</span>: {data?.getProduct.meta?.metaTags?.join(", ")}</p>
                    </> : <p className="text-main font-medium">No product meta</p>
                }
            </div>
        </div>
    );
};

export default ProductMeta;