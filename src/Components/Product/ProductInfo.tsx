import { useState } from "react";

//Components
import Description from "./ProductInfo/Description";
import Specification from "./ProductInfo/Specification";
import Reviews from "./ProductInfo/Reviews";

const buttons = [
    { name: "Description", id: "description" },
    { name: "Specification", id: "specification" },
    { name: "Reviews", id: "reviews" }
]

const ProductInfo = () => {
    //State
    const [selected, setSelected] = useState<string>("description");

    return (
        <div className="mt-12 mb-12">
            <div className="flex gap-4">
                {buttons.map((item, i) => (
                    <button key={i} className={`text-base font-semibold border-2 border-solid py-1.5 px-4 rounded-md ${item.id === selected ? "border-main" : "border-transparent"}`} onClick={() => setSelected(item.id)}>
                        {item.name}
                    </button>
                ))}
            </div>
            <div className="px-5">
                {selected === "description" &&
                    <Description />
                }
                {selected === "specification" &&
                    <Specification />
                }
                {selected === "reviews" &&
                    <Reviews />
                }
            </div>
        </div>
    );
};

export default ProductInfo;