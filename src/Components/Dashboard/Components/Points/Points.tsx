import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import moment from "moment";

//Notifications
import { Notification } from "@/Components/Common/Notifications";

//Components
import Redeem from "./Redeem";

//Urql
import { useQuery } from "urql";
import { GET_USER_POINTS, GET_POINTS, GET_COUPON_CODE } from "@/Urql/Query/Points/point.query";
import { GetUserPoints, GetPointsData, GetCouponData } from "@/Urql/Types/Points/point.types";

const RedeemData = [
    {
        discount: 100,
        minPurchase: 1000,
        points: 1000
    },
    {
        discount: 500,
        minPurchase: 3000,
        points: 5000
    },
    {
        discount: 1000,
        minPurchase: 8000,
        points: 10000
    },
    {
        discount: 2000,
        minPurchase: 15000,
        points: 20000
    }
]

const Points = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();


    //Urql
    const [{ data: userPoints }] = useQuery<GetUserPoints>({ query: GET_USER_POINTS });
    const [{ data: points }] = useQuery<GetPointsData>({ query: GET_POINTS });
    const [{ data: coupon }] = useQuery<GetCouponData>({ query: GET_COUPON_CODE });

    //Const Table Head
    const TABLE_HEAD = ["ID", "Order ID", "Date", "Points"];
    const TABLE_HEAD_POINTS = ["Name", "Points", "Redeem"];
    const TABLE_HEAD_COUPONS = ["ID", "Coupon Code", "Discount", "Discount Unit", "Points", "Date"];

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error ? "error" : "success"}
            >
                {error ?? success}
            </Notification>
            <h4 className="text-lg font-semibold mb-8">My Points</h4>
            <div className="w-[43%] mx-auto text-center bg-gradient-to-br from-[#eb4786] to-[#b854a6] py-4 rounded-md text-white">
                <p className="text-base mt-1 opacity-60">Exchange Rate</p>
                <h4 className="text-2xl font-bold">10 Points = ৳1 Wallet Money</h4>
                <h5 className="mt-1 font-semibold text-base">You Earned {userPoints?.getUserPoints.points || "000"} points</h5>
            </div>
            <h4 className="mt-8 mb-5 text-lg font-semibold">Points Redeem</h4>
            <div className="overflow-auto h-full w-full shadow rounded">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD_POINTS.map((head) => (
                                <th key={head} className={`border-b border-black border-opacity-5 bg-white p-4 ${head === "Action" ? "text-center" : "text-left"}`}>
                                    <Typography
                                        variant="small"
                                        className={`leading-none opacity-70 text-textColor font-semibold ${head === "Redeem" ? "text-right" : ""}`}
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {RedeemData.map((item, i) => {
                            return (
                                <Redeem
                                    item={item}
                                    userPoints={userPoints?.getUserPoints.points as number}
                                    key={i}
                                    onChange={(error, success) => {
                                        setError(error);
                                        setSuccess(success)
                                        setNotification(true)
                                    }}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <h4 className="mt-8 mb-5 text-lg font-semibold">Point Earning History</h4>
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
                        {points?.getPoints.map((item, i) => {
                            const classes = "p-3 border-b border-black border-opacity-5";
                            return (
                                <tr key={i}>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {i + 1}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.order?.orderId}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {moment(item.created_at).format("DD MMM YYYY")}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.points}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                        {points?.getPoints.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={4}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not point yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

            <h4 className="mt-8 mb-5 text-lg font-semibold">Your redeem History</h4>
            <div className="overflow-auto h-full w-full shadow rounded">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD_COUPONS.map((head) => (
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
                        {coupon?.getCouponByUser.map((item, i) => {
                            const classes = "p-3 border-b border-black border-opacity-5";
                            return (
                                <tr key={i}>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {i + 1}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.code}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.discount}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.discountUnit}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {item.points}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography variant="small" className="font-semibold text-[14px]">
                                            {moment(item.created_at).format("DD MMM YYYY")}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                        {coupon?.getCouponByUser.length === 0 &&
                            <tr>
                                <td className="py-5 text-center" colSpan={6}>
                                    <Typography variant="paragraph" className="font-medium opacity-40">
                                        There is not coupon yet!
                                    </Typography>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Points;