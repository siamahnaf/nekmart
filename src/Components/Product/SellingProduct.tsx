import { useRouter } from "next/router";

//Components
import Carousel from "../Home/Products/Carousel";

//Urql
import { useQuery } from "urql";
import { GET_SELLING_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GetSellingProduct } from "@/Urql/Types/Products/product.types";

const SellingProduct = () => {
    //Initializing Hooks
    const router = useRouter();

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSellingProduct>({ query: GET_SELLING_PRODUCT, variables: { getSellingProductId: id } });

    if (!data || data.getSellingProduct.length === 0) return null;

    return (
        <div className="mt-14 mb-8">
            <div className="text-center">
                <h4 className="text-2xl font-semibold text-main">Top Selling Products</h4>
                <p className="text-[15px] mt-2 font-light opacity-60">Check & Get Your Desired Product</p>
            </div>
            <Carousel products={data.getSellingProduct} />
        </div>
    );
};

export default SellingProduct;