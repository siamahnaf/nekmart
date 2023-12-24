import { useRouter } from "next/router";
import { Rating } from "@material-tailwind/react";
import Image from "next/image";
import { Icon } from "@iconify/react";

//Components
import Container from "../Common/Container";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_SELLER } from "@/Urql/Query/Seller/seller.query";
import { GetSingleSellerData } from "@/Urql/Types/Seller/seller.types";

const SellerProfile = () => {
    //Initialize Hooks
    const router = useRouter();

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleSellerData>({ query: GET_SINGLE_SELLER, variables: { getSellerId: id } });

    //Null Return
    if (!data) return null;

    return (
        <section>
            <Container className="py-12">
                <div className="relative aspect-[16/3]">
                    <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + data.getSeller.banner} alt={data.getSeller.shopName} fill className="rounded-md" />
                    <div className="absolute left-5 top-[78%] flex gap-2 items-end">
                        <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + data.getSeller.logo} alt={data.getSeller.shopName} width={300} height={300} className="w-[110px] h-[110px] rounded-full border-2 border-solid border-main" />
                        <div>
                            <p className="text-lg font-semibold">{data.getSeller.shopName}</p>
                            <Rating
                                value={data.getSeller.totalRating / data.getSeller.totalReview}
                                readonly
                                unratedIcon={<Icon className="text-sm" icon="eva:star-outline" />}
                                ratedIcon={<Icon className="text-sm" icon="eva:star-fill" />}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default SellerProfile;