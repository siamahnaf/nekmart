import { useCallback, useEffect, useState } from "react";
import emblaCarouselReact, { EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

//Urql
import { useQuery } from "urql";
import { GET_BANNER_TWO } from "@/Urql/Query/Home/home.query";
import { GetBannerTwo } from "@/Urql/Types/Home/home.types";

const BannerTwo = () => {
    //Initialize Carousel
    const [emblaRef, emblaApi] = emblaCarouselReact({
        skipSnaps: false,
        loop: true
    }, [
        Autoplay({
            delay: 5000,
            stopOnInteraction: false
        })
    ]);

    //Urql
    const [{ data }] = useQuery<GetBannerTwo>({ query: GET_BANNER_TWO });

    //State
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    //Callback Handler
    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );
    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, []);
    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, []);

    //Lifecycle
    useEffect(() => {
        if (!emblaApi) return
        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return (
        <section>
            {data && data.getBannerTwo && data.getBannerTwo.length > 0 &&
                <div className="overflow-hidden relative" ref={emblaRef}>
                    <div className="flex">
                        {data.getBannerTwo.map((item, i) => (
                            <div key={i} className="flex-[0_0_100%]">
                                <Link href={item.url} className="relative block aspect-[150/53]">
                                    <Image
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + item.path}
                                        alt={item.name}
                                        fill
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-2 flex gap-2">
                        {scrollSnaps.map((_, index) => (
                            <DotButton
                                key={index}
                                selected={index === selectedIndex}
                                onClick={() => scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
            }
        </section>
    );
};

export default BannerTwo;

//Dot Button Props
interface Props {
    selected: boolean,
    onClick: () => void
}

//Dot Button
export const DotButton = ({ selected, onClick }: Props) => (
    <button
        className={`w-2 h-2 rounded-full ${selected ? "bg-main" : "bg-white"}`}
        type="button"
        onClick={onClick}
        aria-label="dot"
    />
);