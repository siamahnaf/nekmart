import { Fragment } from "react";
import { Typography } from "@material-tailwind/react";

//Urql
import { useMutation, useQuery } from "urql";
import { REDEEM_CODE, GET_USER_POINTS, GET_COUPON_CODE } from "@/Urql/Query/Points/point.query";
import { RedeemCodeData, GetUserPoints, GetCouponData } from "@/Urql/Types/Points/point.types";

//Interface
interface Props {
    item: {
        discount: number;
        minPurchase: number;
        points: number;
    };
    userPoints: number;
    onChange: (error: string | undefined, success: string | undefined) => void;
}

const Redeem = ({ item, userPoints, onChange }: Props) => {
    //Classes
    const classes = "p-4 border-b border-black border-opacity-5";

    //Urql
    const [_, refetch] = useQuery<GetUserPoints>({ query: GET_USER_POINTS });
    const [__, refetchCoupon] = useQuery<GetCouponData>({ query: GET_COUPON_CODE });
    const [{ data, error, fetching }, mutate] = useMutation<RedeemCodeData>(REDEEM_CODE);

    //SubmitHandler
    const onRedeem = () => {
        mutate({ redeemInput: item }).then(({ data, error }) => {
            onChange(error?.message, data?.redeemCoupon.message)
            if (data?.redeemCoupon.success) {
                refetch({ requestPolicy: "network-only" })
                refetchCoupon({ requestPolicy: "network-only" })
            }
        }).catch(() => {
            onChange(error?.message, data?.redeemCoupon.message)
        })
    }

    return (
        <Fragment>
            <tr>
                <td className={classes}>
                    <h4>Get {item.discount} taka discount!</h4>
                    <p>Minimum order value {item.minPurchase} taka</p>
                </td>
                <td className={classes}>
                    <Typography variant="small" className="text-[15px]">
                        {item.points}
                    </Typography>
                </td>
                <td className={`${classes} text-right`}>
                    <button className={`text-[13px] font-semibold uppercase py-1 px-3 bg-main text-white rounded relative ${(userPoints || 0) < item.points ? "opacity-50" : ""}`} disabled={(userPoints || 0) < item.points} onClick={onRedeem}>
                        <span className={fetching ? "opacity-50" : ""}>Redeem</span>
                        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                            {fetching &&
                                <div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </button>
                </td>
            </tr>
        </Fragment>
    );
};

export default Redeem;