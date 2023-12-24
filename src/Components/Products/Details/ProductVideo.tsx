import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";


//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Product/product.query";
import { GetSingleProductData } from "@/Urql/Types/Product/product.types";

const ProductVideo = () => {
    //State
    const [mount, setMount] = useState<boolean>(false);

    //Initialize Hook
    const router = useRouter();

    //Getting Id
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProductData>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    //Lifecycle
    useEffect(() => {
        setMount(true)
    }, [])

    return (
        <div className="border border-solid border-gray-200 rounded-md  mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Video</h4>
            <div className="p-5">
                {mount && data?.getProduct.youtubeLink &&
                    <ReactPlayer
                        url={data?.getProduct.youtubeLink}
                    />
                }
                {!data?.getProduct.youtubeLink &&
                    <p className="text-main font-medium">No product videos</p>
                }
            </div>
        </div>
    );
};

export default ProductVideo;