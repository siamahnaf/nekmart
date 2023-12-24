import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react";
import slugify from "slugify";

//Components
import Categories from "./Navs/Categories";

//Urql
import { useQuery } from "urql";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GetRunningFlashData } from "@/Urql/Types/Flash/flash.types";

const Navs = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Carousel
    const [emblaRef] = useEmblaCarousel({
        containScroll: "trimSnaps",
        dragFree: true
    });

    //Urql
    const [{ data }] = useQuery<GetRunningFlashData>({ query: GET_RUNNING_FLASH, variables: { searchInput: { page: 1, limit: 50 } } });

    return (
        <div className="flex gap-4">
            <div className="flex-[0_0_10%]">
                <button className="flex items-center gap-1.5" onClick={() => setOpen(true)}>
                    <Icon icon="akar-icons:three-line-horizontal" />
                    <span>All Category</span>
                </button>
                <Categories
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </div>
            <div className="flex-1 overflow-hidden">
                {data && data.getRunningFlashes && data.getRunningFlashes.results.length > 0 &&
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6">
                            {data.getRunningFlashes.results.map((item, i) => (
                                <div key={i} className="whitespace-nowrap">
                                    <Link href={`/flash-deals/${slugify(item.title, { lower: true })}-${item.id}`} className="text-[15px]">{item.title}</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navs;