import { useRouter } from "next/router";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Product/product.query";
import { GetSingleProductData } from "@/Urql/Types/Product/product.types";

const ProductSettings = () => {
    //Initialize Hook
    const router = useRouter();

    //Getting Id
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProductData>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    return (
        <div className="border border-solid border-gray-200 rounded-md  mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Settings</h4>
            <div className="p-5">
                <div className="p-5 grid grid-cols-12 gap-7">
                    <div className="col-span-5">
                        <h4 className="text-base font-semibold mb-2">Product Settings</h4>
                        <hr />
                        <div className="mt-4">
                            <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Show stock</span>: {data?.getProduct.showStock ? "Yes" : "No"}</p>
                            <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Visibility</span>: {data?.getProduct.visibility ? "Yes" : "No"}</p>
                            <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Approved</span>: {data?.getProduct.is_approved ? "Yes" : "No"}</p>
                        </div>
                    </div>
                    <div className="col-span-7">
                        <h4 className="text-base font-semibold mb-2">Disclaimer</h4>
                        <hr />
                        <div className="mt-4">
                            <p>{data?.getProduct.disclaimer}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSettings;