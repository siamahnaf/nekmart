import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";

//Components
import Container from "../Common/Container";

//Urql
import { useQuery } from "urql";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GetRunningFlashData } from "@/Urql/Types/Flash/flash.types";

const Flash = () => {
    //Urql
    const [{ data }] = useQuery<GetRunningFlashData>({ query: GET_RUNNING_FLASH, variables: { searchInput: { page: 1, limit: 50 } } });
    return (
        <section>
            <Container className="py-16">
                <div className="grid grid-cols-3 gap-7">
                    {data?.getRunningFlashes.results.map((item, i) => (
                        <Link href={`/flash-deals/${slugify(item.title, { lower: true })}-${item.id}`} key={i}>
                            {item.thumb ?
                                <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item.thumb} alt={item.title} width={500} height={336} className="rounded-md w-full" /> :

                                <Image src="/placeholder-500.png" alt={item.title} width={500} height={336} className="rounded-md w-full" />
                            }
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Flash;