import { useRouter } from "next/router";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Product/product.query";
import { GetSingleProductData } from "@/Urql/Types/Product/product.types";

const ProductDescription = () => {
    //Initialize Hook
    const router = useRouter();

    //Getting Id
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProductData>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    return (
        <div className="border border-solid border-gray-200 rounded-md  mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Description</h4>
            <div className="p-5">
                {data?.getProduct.description ?
                    (<div className="prose">
                        <div dangerouslySetInnerHTML={{ __html: data?.getProduct.description || "" }} />
                    </div>) : (
                        <p className="text-main font-medium">No description</p>
                    )
                }
            </div>
        </div>
    );
};

export default ProductDescription;