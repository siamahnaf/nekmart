import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GetSingleProduct } from "@/Urql/Types/Products/product.types";

const Videos = () => {
    //Initializing Hooks
    const router = useRouter();

    //State
    const [mount, setMount] = useState<boolean>(false);

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProduct>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    //Lifecycle Hook
    useEffect(() => {
        setMount(true)
    }, []);

    //Not Data return
    if (!data || !data.getProduct.youtubeLink) return null;

    return (
        <div className="w-[60%] mt-12">
            <h4 className="text-base font-semibold mb-4">Product videos</h4>
            <div className="aspect-video">
                {mount &&
                    <ReactPlayer
                        url={data.getProduct.youtubeLink}
                        controls
                        width="100%"
                        height="100%"
                    />
                }
            </div>
        </div>
    );
};

export default Videos;