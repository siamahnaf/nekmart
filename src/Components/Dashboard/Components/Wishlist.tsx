import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import slugify from "slugify";

import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_WISHLIST, DELETE_WISHLIST } from "@/Urql/Query/Wishlist/wishlist.query";
import { GetWishlistData, DeleteWishlist } from "@/Urql/Types/Wishlist/wishlist.types";

const Wishlist = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data }, refetch] = useQuery<GetWishlistData>({ query: GET_WISHLIST });
    const [{ data: deleteData, error }, mutate] = useMutation<DeleteWishlist>(DELETE_WISHLIST);

    //Handler
    const onDelete = (id: string) => {
        mutate({ deleteWishlistId: id }).then(({ data }) => {
            setNotification(true)
            if (data?.deleteWishlist.success) {
                refetch({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            setNotification(true)
        })
    }


    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div className="grid grid-cols-3 gap-6">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? deleteData?.deleteWishlist.message}
            </Notification>
            {data?.getWishlist.map((item, i) => (
                <div className="border border-solid border-gray-300 rounded-md" key={i}>
                    <div className="p-4">
                        <Image
                            src={process.env.NEXT_PUBLIC_IMAGE_URL + item.product.images[0]}
                            alt={item.product.name}
                            width={500}
                            height={500}
                            className="w-full rounded-md"
                        />
                        <h4 className="text-base font-semibold line-clamp-1 mt-2">{item.product.name}</h4>
                        <h4 className="text-lg font-bold text-main mt-1">{item.product.totalPrice}tk</h4>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="p-4 flex gap-4">
                        <button className="px-3" onClick={() => onDelete(item.id)}>
                            <Icon className="text-xl text-main" icon="uiw:delete" />
                        </button>
                        <Link href={`/product/${slugify(item.product.name, { lower: true })}-${item.product.id}`} className="flex gap-2 w-full bg-main items-center justify-center py-2 text-white rounded-md">
                            <Icon icon="ph:eye-bold" />
                            <span className="text-sm uppercase font-medium">View Product</span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Wishlist;