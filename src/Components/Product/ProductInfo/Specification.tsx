import { useRouter } from "next/router";
import { Typography } from "@material-tailwind/react";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GetSingleProduct } from "@/Urql/Types/Products/product.types";

const Specification = () => {
    //Initializing Hooks
    const router = useRouter();

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProduct>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    //Not Data return
    if (!data || !data.getProduct.specification) return (
        <p className="text-base opacity-70 mt-7">There have been no specification for this product yet.</p>
    );

    return (
        <div className="mt-7">
            {data.getProduct.specification.length > 0 &&
                <table className="w-full min-w-max table-auto text-left">
                    <tbody>
                        {data.getProduct.specification.map((item, i) => {
                            const isLast = i === data.getProduct.specification?.length - 1;
                            const classes = "p-4 border border-blue-gray-100";
                            return (
                                <tr key={i}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.title}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.value}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default Specification;