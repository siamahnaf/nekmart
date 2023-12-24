import { useRouter } from "next/router";
import { Rating } from "@material-tailwind/react";
import Image from "next/image";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";

//Urql
import { useQuery } from "urql";
import { GET_REVIEWS } from "@/Urql/Query/Review/review.query";
import { GetReviewsData } from "@/Urql/Types/Review/review.types";

const Reviews = () => {
    //Initializing Hooks
    const router = useRouter();

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetReviewsData>({ query: GET_REVIEWS, variables: { productId: id } });

    if (!data) return null;

    return (
        <div className="mt-7">
            {data.getReviewByProduct.length === 0 &&
                <p className="text-base opacity-70">There have been no reviews for this product yet.</p>
            }
            {data.getReviewByProduct.map((item, i) => (
                <div key={i}>
                    <Rating
                        value={item.rating}
                        readonly
                    />
                    <p className="text-[15px] opacity-70 mt-1 mb-2">by {item.user.phone.slice(0, 6) + '*'.repeat(6)}</p>
                    <p className="text-base opacity-95 mb-3">{item.comment}</p>
                    <SlideshowLightbox lightboxIdentifier="lightbox1" className="flex gap-4">
                        {item.image &&
                            item.image.map((img, i) => (
                                <div className="w-[90px] h-[90px] relative" key={i}>
                                    <Image
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL as string + img}
                                        alt="Image"
                                        fill
                                        key={i}
                                        data-lightboxjs="lightbox1"
                                        className="w-full !h-auto rounded-md"
                                    />
                                </div>
                            ))
                        }
                    </SlideshowLightbox>
                    <div className="ml-14 mt-6 border border-solid border-gray-300 p-5 rounded-md">
                        <p className="text-[15px] opacity-70 mt-1 mb-2">Reply by {item.seller.shopName}</p>
                        <p className="text-base opacity-95">{item.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;