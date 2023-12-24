import { useState } from "react";
import { Typography, Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import slugify from "slugify";

//Urql
import { useQuery } from "urql";
import { GET_UNAPPROVED_PRODUCTS } from "@/Urql/Query/Product/product.query";
import { GetUnapprovedProducts } from "@/Urql/Types/Product/product.types";

const Lists = () => {
    //State
    const [pagination, setPagination] = useState<number>(1);

    //Const Table Head
    const TABLE_HEAD = ["ID", "Name", "Image", "Category", "Brand", "Qty", "Price", "Status", "Action"];

    //Urql
    const [{ data }] = useQuery<GetUnapprovedProducts>({ query: GET_UNAPPROVED_PRODUCTS, variables: { searchInput: { limit: 20, page: pagination } }, requestPolicy: "cache-and-network" });

    return (
        <div className="mt-2">
            <h6 className="font-bold text-lg mb-3">Unapproved Products</h6>
            <div className="overflow-auto h-full w-full shadow rounded">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className={`border-b border-black border-opacity-5 bg-white p-3 ${head === "Action" ? "text-center" : "text-left"}`}>
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
                        {data?.getUnapprovedProduct.results.map((item, i) => {
                            const classes = "p-3 border-b border-black border-opacity-5";
                            return (
                                <tr key={i}>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {i + 1}
                                        </Typography>
                                    </td>
                                    <td className={`${classes} max-w-[180px]`}>
                                        <Typography variant="small" className="font-semibold text-[14px] line-clamp-1">
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
                                            {item.brand?.name}
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
                                            {item.is_approved ? "Approved" : "Draft"}
                                        </Typography>
                                    </td>
                                    <td className={`${classes}`}>
                                        <div className="flex gap-3 justify-center items-center">
                                            <div>
                                                <Tooltip content="See Details" placement="top" className="text-xs bg-black bg-opacity-70">
                                                    <button>
                                                        <Link href={`/products/${slugify(item.name, { lower: true })}-${item.id}`}>
                                                            <Icon icon="carbon:view-filled" />
                                                        </Link>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {data?.getUnapprovedProduct.results.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={9}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not unapproved products yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className="p-3 flex gap-2 items-center">
                    <p className="text-sm flex-1">
                        Page <span className="font-semibold">{data?.getUnapprovedProduct.meta.currentPage}</span> of {data?.getUnapprovedProduct.meta.totalPages}
                    </p>
                    {data?.getUnapprovedProduct.meta.totalPages && data.getUnapprovedProduct.meta.totalPages > 1 &&
                        <div className="flex justify-end gap-2">
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination <= 1 ? "opacity-40" : "opacity-100"}`} disabled={pagination <= 1} onClick={() => setPagination(pagination - 1)}>
                                <Icon icon="ooui:next-rtl" />
                            </button>
                            <button className={`border border-black border-solid p-1.5 rounded ${pagination >= (data?.getUnapprovedProduct?.meta?.totalPages || 0) ? "opacity-40" : "opacity-100"}`} disabled={pagination >= (data?.getUnapprovedProduct?.meta?.totalPages || 0)} onClick={() => setPagination(pagination + 1)}>
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