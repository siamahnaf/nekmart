import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTimer } from "react-timer-hook";

//Components
import Container from "../Common/Container";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GetSingleFlashData } from "@/Urql/Types/Flash/flash.types";

const FlashDetails = () => {
    //Initializing Hooks
    const router = useRouter();

    //State
    const [mount, setMount] = useState<boolean>(false);

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data, error }] = useQuery<GetSingleFlashData>({ query: GET_SINGLE_FLASH, variables: { getFlashId: id } });

    //Timer Setup
    const expiryTimestamp = new Date(data?.getFlash?.expires as Date);
    const {
        seconds,
        minutes,
        hours,
        days,
        restart
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    //Lifecycle Hooks
    useEffect(() => {
        restart(expiryTimestamp);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        setMount(true)
    }, [])

    //Error Return
    if (error) {
        return (
            <p className="text-center text-main font-semibold mt-16">{error.message}</p>
        )
    }

    //Not Data Return
    if (!data) {
        return null
    }

    return (
        <section>
            <div className="aspect-[25/6] relative">
                {data.getFlash.image &&
                    <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + data.getFlash.image} alt={data.getFlash.title} fill />
                }
            </div>
            <Container>
                <div className="py-8">
                    <h4 className="text-center text-2xl font-semibold">{data.getFlash.title}</h4>
                    {mount &&
                        <div className="flex gap-4 justify-center mt-5">
                            <p className="w-11 h-10 rounded bg-[#c1c23aff] flex justify-center items-center">
                                <span className="text-lg font-medium text-white">{days < 10 ? `0${days}` : days}</span>
                            </p>
                            <p className="w-11 h-10 rounded bg-[#c1c23aff] flex justify-center items-center">
                                <span className="text-lg font-medium text-white">{hours < 10 ? `0${hours}` : hours}</span>
                            </p>
                            <p className="w-11 h-10 rounded bg-[#c1c23aff] flex justify-center items-center">
                                <span className="text-lg font-medium text-white">{minutes < 10 ? `0${minutes}` : minutes}</span>
                            </p>
                            <p className="w-11 h-10 rounded bg-[#c1c23aff] flex justify-center items-center">
                                <span className="text-lg font-medium text-white">{seconds < 10 ? `0${seconds}` : seconds}</span>
                            </p>
                        </div>
                    }
                </div>
            </Container>
        </section>
    );
};

export default FlashDetails;