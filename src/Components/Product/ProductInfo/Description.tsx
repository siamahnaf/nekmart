import { useRouter } from "next/router";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GetSingleProduct } from "@/Urql/Types/Products/product.types";

const Description = () => {
    //Initializing Hooks
    const router = useRouter();

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProduct>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    //Not Data return
    if (!data) return null;

    return (
        <div className="mt-7">
            <div className="prose">
                <div dangerouslySetInnerHTML={{ __html: data.getProduct.description || "" }} />
            </div>
            <p className="text-[15px] mt-8">
                <span className="text-main font-semibold">Disclaimer: </span>
                <span>{data.getProduct.disclaimer}</span>
            </p>
        </div>
    );
};

export default Description;