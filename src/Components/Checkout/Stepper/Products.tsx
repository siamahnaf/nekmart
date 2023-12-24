import { useState, useEffect, useContext } from "react";
import { Typography, Checkbox } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

//Helper Function
import { calculateCarts } from "@/Helpers/checkout";

//Components
import { Notification } from "@/Components/Common/Notifications";

//Context
import { CartTypes, checkoutContext } from "@/Context/checkout.context";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_CART } from "@/Urql/Query/Cart/cart.query";
import { APPLY_COUPON } from "@/Urql/Query/Checkout/checkout.query";
import { GetCartData, CartData } from "@/Urql/Types/Cart/cart.types";
import { ApplyCouponData } from "@/Urql/Types/Checkout/checkout.types";

//Interface
interface Inputs {
    code: string;
}

const Products = () => {
    //Urql
    const [{ data, fetching }] = useQuery<GetCartData>({ query: GET_CART });
    const [{ data: coupon, error, fetching: couponFetching }, mutate] = useMutation<ApplyCouponData>(APPLY_COUPON);

    //State
    const [selected, setSelected] = useState<string[]>([]);
    const [notification, setNotification] = useState<boolean>(false);

    //Const Table Head
    const TABLE_HEAD = ["", "ID", "Product", "Price", "Quantity", "Total"];

    //Context
    const { carts, setCart, handleNext } = useContext(checkoutContext);

    //Initialize Coupon
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<Inputs>();

    //Get Total tax
    const totalTax = carts?.sellers.reduce((acc, seller) => {
        const sellerTotalTax = seller.products.reduce((sellerAcc, product) => {
            return sellerAcc + product.tax;
        }, 0);

        return acc + sellerTotalTax;
    }, 0);

    //Form Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate({ applyInput: { code: value.code, minPurchase: (Number(carts?.total) + Number(totalTax)).toString() } }).then(({ data }) => {
            setNotification(true)
            if (data?.applyCoupon.success) {
                setCart?.((prevCart) => ({
                    ...prevCart,
                    couponDiscount: Number(data.applyCoupon.discount),
                }) as CartTypes);
            }
        }).catch(() => {
            setNotification(true)
        })
    }

    //Get Calculated Price
    const getCalculatedPrice = (item: CartData) => {
        if (item.attributes) {
            const variantName = item.attributes.map(n => n.variant).join("-");
            const normalizeString = (str: string) => str.split('').sort().join('');
            const normalizedVariant = normalizeString(variantName);
            const attributes = item.productId?.attributes?.attributes.find(a => {
                const normalizedAttribute = normalizeString(a.variant as string);
                return normalizedAttribute === normalizedVariant;
            });
            if (attributes) {
                let totalPrice;
                if (item.productId.discountUnit === "percent") {
                    totalPrice = Math.round(Number(attributes.price) - (Number(attributes.price) * (Number(item.productId.discount) / 100)));
                } else if (item.productId.discountUnit === "flat") {
                    totalPrice = Math.round(Number(attributes.price) - Number(item.productId.discount));
                }
                return {
                    price: totalPrice
                }
            }
            return {
                price: item.productId.totalPrice
            }
        } else {
            return {
                price: item.productId.totalPrice
            }
        }
    }

    //Select On Change
    const selectionChanged = (id: string) => {
        setSelected(prevSelected => (
            prevSelected.includes(id)
                ? prevSelected.filter(item => item !== id)
                : [...prevSelected, id]
        ));
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    //On Whole Selection
    const onWholeSelection = () => {
        if (data) {
            if (selected.length === data.getCarts.length) {
                setSelected([]);
            } else {
                setSelected(data.getCarts.map(item => item.id))
            }
        }
    }

    //Lifecycle Hook
    useEffect(() => {
        setSelected(data?.getCarts.map(item => item.id) || [])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        const filterCarts = data?.getCarts.filter(item => selected.includes(item.id));
        const results = calculateCarts(filterCarts || []);
        setCart?.(results);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    //If Loading
    if (fetching) return (
        <div className="w-6 h-6 border-b-2 border-main rounded-full animate-spin mx-auto"></div>
    )

    return (
        <div>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? coupon?.applyCoupon.message}
            </Notification>
            <div className="grid grid-cols-12 gap-10 items-start">
                <div className="col-span-8">
                    <h6 className="font-semibold text-base mb-6">Selected Product</h6>
                    <div className="overflow-auto h-full w-full shadow rounded">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head, i) => (
                                        <th key={i} className={`border border-black border-opacity-5 bg-white px-3 py-1 ${head === "Action" ? "text-center" : "text-left"}`}>
                                            {i === 0 ? (<Checkbox
                                                color="red"
                                                crossOrigin="anonymous"
                                                id={i.toString()}
                                                className="border-gray-400 w-4 h-4 rounded"
                                                checked={selected.length === data?.getCarts.length}
                                                onChange={onWholeSelection}
                                            />) : (
                                                <Typography
                                                    variant="small"
                                                    className="leading-none opacity-70 text-textColor font-semibold"
                                                >
                                                    {head}
                                                </Typography>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data?.getCarts.map((item, i) => {
                                    const classes = "px-3 py-1 border-b border-black border-opacity-5";
                                    return (
                                        <tr key={i}>
                                            <td className={`${classes} w-[50px]`}>
                                                <Checkbox
                                                    color="red"
                                                    crossOrigin="anonymous"
                                                    id={i.toString()}
                                                    className="border-gray-400 w-4 h-4 rounded"
                                                    checked={selected.includes(item.id)}
                                                    onChange={() => selectionChanged(item.id)}
                                                />
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" className="font-semibold text-[14px]">
                                                    {i + 1}
                                                </Typography>
                                            </td>
                                            <td className={`${classes} max-w-[380px]`}>
                                                <Typography variant="small" className="font-semibold text-[14px] line-clamp-1">
                                                    {item.productId.name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" className="font-semibold text-[14px]">
                                                    ৳{getCalculatedPrice(item).price}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" className="font-semibold text-[14px]">
                                                    {item.reserved}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" className="font-semibold text-[14px]">
                                                    ৳{Number(getCalculatedPrice(item).price) * item.reserved}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {data?.getCarts.length === 0 &&
                                    <tr>
                                        <td className="py-5 text-center" colSpan={6}>
                                            <Typography variant="paragraph" className="font-medium opacity-40">
                                                There is not product in your cart yet!
                                            </Typography>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-4">
                    <h6 className="font-semibold text-base mb-6">Summery</h6>
                    <div>
                        {carts?.sellers.map((item, i) => (
                            <div key={i} className="text-[15px]">
                                <div className="flex gap-2 items-center">
                                    <Icon icon="mdi:package-outline" />
                                    <span>by <span className="font-semibold">{item.shopName}</span></span>
                                </div>
                                <hr className="border-gray-400 my-2" />
                                {item.products.map((product, i) => (
                                    <div key={i}>
                                        <div className="flex gap-4">
                                            <p className="flex-1 flex gap-1 text-sm">
                                                <span className="max-w-[250px] line-clamp-1">{product.name}</span>
                                                <span className="font-semibold">× {product.quantity}</span>
                                            </p>
                                            <p>
                                                ৳{product.amount}
                                            </p>
                                        </div>
                                        <hr className="border-gray-400 my-2" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-5 text-[15px]">
                        <span className="flex-1 font-semibold">Tax</span>
                        <span>৳{totalTax}</span>
                    </div>
                    <hr className="border-gray-400 my-2" />
                    <div className="flex gap-5 text-[15px]">
                        <span className="flex-1 font-semibold">Coupon Discount</span>
                        <span>৳{carts?.couponDiscount}</span>
                    </div>
                    <hr className="border-gray-400 my-2" />
                    <div className="flex gap-5 text-[15px]">
                        <span className="flex-1 font-semibold">Total</span>
                        <span>৳{(Number(carts?.total) + Number(totalTax)) - Number(carts?.couponDiscount)}</span>
                    </div>
                    <form className="flex mt-7" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            placeholder="Add coupon"
                            className="w-full border border-solid border-main py-2 px-4 rounded-s-md focus:outline-none"
                            {...register("code", { required: true })}
                            required
                        />
                        <button className="px-4 bg-main text-white font-medium rounded-e-md relative" type="submit">
                            <span className={`${couponFetching ? "opacity-50" : ""}`}>Apply</span>
                            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                {couponFetching &&
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                }
                            </div>
                        </button>
                    </form>
                </div>
            </div>
            <div className="flex gap-10 mt-20 items-center">
                <div className="flex-1">
                    <Link href="/" className="text-main font-medium text-sm">
                        Back to shopping
                    </Link>
                </div>
                <div>
                    <button className={`bg-main py-2 px-5 rounded-md text-white font-semibold text-sm ${selected.length === 0 ? "opacity-40" : ""}`} disabled={selected.length === 0} onClick={handleNext}>
                        Continue to shipping info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Products;