import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

//Components
import Container from "../Common/Container";

//Urql
import { useQuery } from "urql";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GetRunningFlashData } from "@/Urql/Types/Flash/flash.types";

const FlashCard = () => {
    //Urql
    const [{ data }] = useQuery<GetRunningFlashData>({ query: GET_RUNNING_FLASH, variables: { searchInput: { page: 1, limit: 50 } } });

    return (
        <section>
            <Container className="py-16 grid grid-cols-2 gap-7">
                {data?.getRunningFlashes.results.map((item, i) => (
                    <Link href={`/flash-deals/${slugify(item.title, { lower: true })}-${item.id}`} key={i}>
                        {item.image ? <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item.image} alt={item.title} width={615} height={165} className="w-full rounded-md" /> : <Image src="/placeholder-615.png" alt={item.title} width={615} height={165} className="w-full rounded-md" />}
                    </Link>
                ))}
            </Container>
        </section>
    );
};

export default FlashCard;