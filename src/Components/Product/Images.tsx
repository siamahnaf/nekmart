import { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Magnify from "../Common/Magnify";

//Context
import { imageContext } from "@/Context/image.context";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GetSingleProduct } from "@/Urql/Types/Products/product.types";

const Images = () => {
    //Initializing Hooks
    const router = useRouter();

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProduct>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    //Context
    const { selected, setSelected } = useContext(imageContext);

    //Not Data return
    if (!data) return null;

    return (
        <div className="sticky h-max top-20 z-30">
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-1">
                    {data.getProduct.images.map((item, i) => (
                        <div onClick={() => setSelected?.(item)} className="border-2 border-solid border-main rounded p-2 mb-3 select-none cursor-pointer" key={i}>
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item} alt={i.toString()} width={300} height={300} className="rounded" />
                        </div>
                    ))}
                </div>
                <div className="col-span-4 relative">
                    <Magnify
                        imageProps={{
                            src: process.env.NEXT_PUBLIC_IMAGE_URL + (selected ?? data.getProduct.images[0]),
                            alt: "Small Image",
                            width: 700,
                            height: 700
                        }}
                        magnificationFactor={4}
                        lenseSize={90}
                    />
                </div>
            </div>
        </div>
    );
};

export default Images;