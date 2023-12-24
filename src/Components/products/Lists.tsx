import { useState } from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import slugify from "slugify";

//Components
import { Notification } from "../Common/Notification";
import Confirm from "../Common/Confirm";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_OWN_PRODUCTS, DELETE_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GetOwnProductsData, DeleteProducts } from "@/Urql/Types/Products/product.types";

const Lists = () => {
    //State
    const [notification, setNotification] = useState(false);
    const [confirm, setConfirm] = useState<string | null>(null);
    const [pagination, setPagination] = useState<number>(1);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Name", "Image", "Category", "Qty", "Price", "Status", "Visibility", "Action"];

    //Urql
    const [{ data }, refetch] = useQuery<GetOwnProductsData>({ query: GET_OWN_PRODUCTS, variables: { searchInput: { limit: 20, page: pagination } }, requestPolicy: "cache-and-network" });
    const [{ data: deleteData, error, fetching }, mutate] = useMutation<DeleteProducts>(DELETE_PRODUCT);

    //On Delete Confirm
    const onDeleteConfirm = (id: string) => {
        mutate({ deleteProductId: id }).then(() => {
            setNotification(true)
            setConfirm(null)
            refetch({ requestPolicy: "network-only" })
        }).catch(() => {
            setNotification(true)
            setConfirm(null)
        })
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div className="mt-8">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? deleteData?.deleteProduct.message}
            </Notification>
            <h6 className="font-bold text-lg mb-3">All Products</h6>
            <div className="overflow-auto h-full w-full shadow rounded">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className={`border-b border-black border-opacity-5 bg-white p-4 ${head === "Action" ? "text-center" : "text-left"}`}>
                                    <Typography
                                        variant="small"
                                        className="leading-none opacity-70 text-textColor font-semibold"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.getOwnSellerProducts.results.map((item, i) => {
                            const classes = "p-3 border-b border-black border-opacity-5";
                            return (
                                <tr key={i}>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {i + 1}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} max-w-[180px]`}>
                                        <Typography variant="small" className="font-semibold text-[14px] line-clamp-1" title={item.name}>
                                            {item.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item.images[0]} alt={item.name} width={100} height={100} className="w-[40px] rounded-md" />
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.main_category.name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.quantity}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            ৳{item.price}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] ${item.is_approved ? "text-green-600" : "text-red-600"}`}>
                                            {item.is_approved ? "Approved" : "Pending"}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className={`font-semibold text-[14px] ${item.visibility ? "text-green-600" : "text-red-600"}`}>
                                            {item.visibility ? "Published" : "Draft"}
                                        </Typography>
                                    </td>
                                    <td className={`${classes}`}>
                                        <div className="flex gap-3 justify-center items-center">
                                            <div>
                                                <Tooltip content="Edit Brand" placement="top" className="text-xs bg-black bg-opacity-70">
                                                    <button>
                                                        <Link href={`/product/update-product/${slugify(item.name, { lower: true })}-${item.id}`}>
                                                            <Icon icon="mdi:file-edit" />
                                                        </Link>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip content="Delete Brand" placement="top" className="text-xs bg-black bg-opacity-70">
                                                    <button onClick={() => setConfirm(item.id)} disabled={fetching}>
                                                        <Icon className="text-main" icon="icon-park-outline:delete" />
                                                    </button>
                                                </Tooltip >
                                                <Confirm
                                                    open={confirm === item.id}
                                                    onClose={() => setConfirm(null)}
                                                    fetching={fetching}
                                                    id={item.id}
                                                    onConfirm={(id) => onDeleteConfirm(id)}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {data?.getOwnSellerProducts.results.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={4}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not product yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="p-3 flex gap-2 items-center">
                    <p className="text-sm flex-1">
                        Page <span className="font-semibold">{data?.getOwnSellerProducts.meta.currentPage}</span> of {data?.getOwnSellerProducts.meta.totalPages}
                    </p>
                    {data?.getOwnSellerProducts.meta.totalPages && data.getOwnSellerProducts.meta.totalPages > 1 &&
                        <div className="flex justify-end gap-2">
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination <= 1 ? "opacity-40" : "opacity-100"}`} disabled={pagination <= 1} onClick={() => setPagination(pagination - 1)}>
                                <Icon icon="ooui:next-rtl" />
                            </button>
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination >= (data?.getOwnSellerProducts?.meta?.totalPages || 0) ? "opacity-40" : "opacity-100"}`} disabled={pagination >= (data?.getOwnSellerProducts?.meta?.totalPages || 0)} onClick={() => setPagination(pagination + 1)}>
                                <Icon icon="ooui:next-ltr" />
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Lists;