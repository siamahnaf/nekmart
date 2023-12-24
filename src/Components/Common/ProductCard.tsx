import Image from "next/image";

//Urql
import { ProductData } from "@/Urql/Types/Products/product.types";

//Interface
interface Props {
    product: ProductData;
    showDiscount?: boolean
}

const ProductCard = ({ product, showDiscount = true }: Props) => {
    return (
        <div className="bg-white shadow-5xl py-4 px-5 text-center rounded-lg relative">
            <Image
                src={process.env.NEXT_PUBLIC_IMAGE_URL + product.images[0]}
                alt={product.name}
                width={500}
                height={500}
                className="w-full rounded-lg"
            />
            <h4 className="text-base line-clamp-2 mt-4 h-[42px] leading-5">{product.name}</h4>
            <div className="flex gap-4 justify-center mt-4">
                <h6 className="text-base font-semibold text-main opacity-70 line-through">{product.price}tk</h6>
                <h6 className="text-base font-semibold text-main">{product.totalPrice}tk</h6>
            </div>
            {showDiscount &&
                <div className="bg-white absolute -left-[6%] top-[6%] shadow-5xl flex gap-1 px-3 py-[5px] rounded">
                    <span className="text-sm font-semibold text-main">OFF</span>
                    <span className="bg-main text-sm font-semibold py-px px-1 rounded-[3px] text-white">{product.discount}{product.discountUnit === "percent" ? "%" : "৳"}</span>
                </div>
            }
        </div>
    );
};

export default ProductCard;