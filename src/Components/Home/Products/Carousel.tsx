import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Icon } from "@iconify/react";
import Link from "next/link";
import slugify from "slugify";

//Components
import ProductCard from "@/Components/Common/ProductCard";

//Urql
import { ProductData } from "@/Urql/Types/Products/product.types";

//Interface
interface Props {
    products: ProductData[];
}

const Carousel = ({ products }: Props) => {
    //Initializing Embla
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true
    }, [
        Autoplay({
            delay: 3500
        })
    ]);

    //State
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi]
    )
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi]
    )

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    return (
        <div className="mt-10 relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                    {products.map((item, i) => (
                        <div key={i} className="flex-[0_0_20%] py-8">
                            <Link href={`/product/${slugify(item.name, { lower: true })}-${item.id}`}>
                                <ProductCard product={item} showDiscount={false} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex absolute gap-3 -top-3 right-0">
                <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
                <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
            </div>
        </div>
    );
};

export default Carousel;

//Interface
interface ButtonProps {
    onClick: () => void | undefined;
    disabled: boolean;
}

//Previous Button
const PrevButton = ({ onClick, disabled }: ButtonProps) => {
    return (
        <button className="bg-main py-1.5 px-2 rounded text-white" disabled={disabled} onClick={onClick}>
            <Icon className="text-3xl" icon="tabler:chevron-left" />
        </button>
    )
}

//Next Button
const NextButton = ({ onClick, disabled }: ButtonProps) => {
    return (
        <button className="bg-main py-1.5 px-2 rounded text-white" disabled={disabled} onClick={onClick}>
            <Icon className="text-3xl" icon="tabler:chevron-right" />
        </button>
    )
}

