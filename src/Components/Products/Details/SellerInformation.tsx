import { useRouter } from "next/router";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Product/product.query";
import { GetSingleProductData } from "@/Urql/Types/Product/product.types";

const SellerInformation = () => {
    //Initialize Hook
    const router = useRouter();

    //Getting Id
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProductData>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    return (
        <div className="border border-solid border-gray-200 rounded-md  mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Seller Information</h4>
            <div className="p-5">
                <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Name</span>: {data?.getProduct.seller.shopName}</p>
                <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Phone</span>: {data?.getProduct.seller.phone}</p>
                <p className="font-medium text-gray-700 mb-1.5 text-[15px]"><span className="font-semibold">Address</span>: {data?.getProduct.seller.address}</p>
            </div>
        </div>
    );
};

export default SellerInformation;