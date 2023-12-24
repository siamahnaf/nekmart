import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

//Components
import Account from "./Icons/Account";
import CartDrawer from "./Icons/CartDrawer";

//Urql
import { useQuery } from "urql";
import { GET_WISHLIST } from "@/Urql/Query/Wishlist/wishlist.query";
import { GET_CART } from "@/Urql/Query/Cart/cart.query";
import { GetWishlistData } from "@/Urql/Types/Wishlist/wishlist.types";
import { GetCartData } from "@/Urql/Types/Cart/cart.types";

const Icons = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Urql
    const [{ data: wishlist }] = useQuery<GetWishlistData>({ query: GET_WISHLIST });
    const [{ data: cart }] = useQuery<GetCartData>({ query: GET_CART });

    return (
        <div className="col-span-4">
            <ul className="flex gap-4 justify-end items-center">
                <li>
                    <Link href="/flash-deals" className="bg-whiter w-10 h-10 rounded-md flex justify-center items-center hover:bg-white_hover">
                        <Icon className="text-xl text-main" icon="carbon:flash-filled" />
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/wishlist" className="bg-whiter w-10 h-10 rounded-md flex justify-center items-center relative hover:bg-white_hover">
                        <Icon className="text-xl text-main" icon="ant-design:heart-filled" />
                        <p className="bg-white text-[10px] w-4 h-4 flex justify-center items-center rounded-full  absolute top-0.5 right-0.5 shadow-3xl">
                            <span>{wishlist?.getWishlist.length || 0}</span>
                        </p>
                    </Link>
                </li>
                <li>
                    <button className="bg-whiter w-10 h-10 rounded-md flex justify-center items-center relative hover:bg-white_hover" onClick={() => setOpen(true)}>
                        <Icon className="text-xl text-main" icon="bi:cart-fill" />
                        <p className="bg-white text-[10px] w-4 h-4 flex justify-center items-center rounded-full  absolute top-0.5 right-0.5 shadow-3xl">
                            <span>{cart?.getCarts?.length || 0}</span>
                        </p>
                    </button>
                    <CartDrawer
                        open={open}
                        onClose={() => setOpen(false)}
                    />
                </li>
                <li>
                    <Account />
                </li>
            </ul>
        </div>
    );
};

export default Icons;