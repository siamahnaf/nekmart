import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Icon } from "@iconify/react";

//Components
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_SINGLE_SELLER, VERIFY_SELLER } from "@/Urql/Query/Seller/seller.query";
import { GetSingleSellerData, VerifySellerData } from "@/Urql/Types/Seller/seller.types";

const Profile = () => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Initialize Hook
    const router = useRouter();

    //Finding Ids
    const parts = router.query.id?.toString().split('-') as string[];
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }, refetch] = useQuery<GetSingleSellerData>({ query: GET_SINGLE_SELLER, variables: { getSellerByAdminId: id } });
    const [{ data: verifyData, error, fetching }, mutate] = useMutation<VerifySellerData>(VERIFY_SELLER);

    //Handler
    const onVerify = () => {
        mutate({ verifySellerId: data?.getSellerByAdmin.id }).then(({ data }) => {
            setNotification(true)
            if (data?.verifySeller.success) {
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
        <div>
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? verifyData?.verifySeller.message}
            </Notification>
            <h6 className="font-bold text-lg mb-8">Seller Profile</h6>
            <div className="border border-solid border-gray-200 rounded-md">
                <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Profile Details</h4>
                <div>
                    <Image src={process.env.NEXT_PUBLIC_IMAGE_URL as string + data?.getSellerByAdmin.banner as string} alt={data?.getSellerByAdmin.shopName as string} width={1600} height={300} />
                    <div className="flex items-end gap-3 -mt-14 px-5">
                        <div>
                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL as string + data?.getSellerByAdmin.logo as string} alt={data?.getSellerByAdmin.shopName as string} width={300} height={300} className="border-2 border-solid border-main rounded-full w-[120px] h-[120px]" />
                        </div>
                        <div className="mb-2">
                            <h4 className="text-lg font-bold">{data?.getSellerByAdmin.shopName}</h4>
                            <p className="text-base">+{data?.getSellerByAdmin.phone}</p>
                        </div>
                    </div>
                </div>
                <div className="p-5 grid grid-cols-2 gap-8">
                    <div>
                        <p className="text-[15px] flex mb-2 items-center gap-1">
                            <Icon icon="ci:location" className="text-[20px] text-main" />
                            <span>{data?.getSellerByAdmin.address}</span>
                        </p>
                        <p className="text-[15px] mb-2 flex items-center gap-1">
                            <Icon icon="fluent:subtitles-24-regular" className="text-lg text-main" />
                            <span>{data?.getSellerByAdmin.metaTitle}</span>
                        </p>
                        <p className="text-[15px] mb-2 flex items-center gap-1">
                            <Icon icon="fluent:text-description-24-regular" className="text-lg text-main" />
                            <span> {data?.getSellerByAdmin.metaDescription}</span>
                        </p>
                        <p className="text-[15px] mb-2 flex items-center gap-1">
                            <Icon icon="ic:round-verified" className="text-lg text-main" />
                            <span className={`font-semibold ${data?.getSellerByAdmin.is_verified ? "text-green-600" : "text-red-600"}`}>{data?.getSellerByAdmin?.is_verified ? "Verified" : "Non-verified"}</span>
                        </p>
                        <p className="text-[15px] flex items-center gap-1">
                            <Icon icon="humbleicons:ban" className="text-lg text-main" />
                            <span>{data?.getSellerByAdmin?.is_banned ? "Banned" : "Not Banned"}</span>
                        </p>
                    </div>
                    {data?.getSellerByAdmin.bank &&
                        <div>
                            <p className="text-sm flex items-center gap-1.5">
                                <span className="opacity-50">Account Name</span>: <span>{data?.getSellerByAdmin.bank?.bankName}</span>
                            </p>
                            <p className="text-sm flex items-center gap-1.5">
                                <span className="opacity-50">Account No</span>: <span>{data?.getSellerByAdmin.bank?.accNumber}</span>
                            </p>
                            <p className="text-sm flex items-center gap-1.5">
                                <span className="opacity-50">Routing No</span>: <span>{data?.getSellerByAdmin.bank?.routing}</span>
                            </p>
                            <p className="text-sm flex items-center gap-1.5">
                                <span className="opacity-50">Bank Name</span>: <span>{data?.getSellerByAdmin.bank?.bankName}</span>
                            </p>
                            <p className="text-sm flex items-center gap-1.5">
                                <span className="opacity-50">Branch</span>: <span>
                                    {data?.getSellerByAdmin.bank?.branch}
                                </span>
                            </p>
                        </div>
                    }
                </div>
                {!data?.getSellerByAdmin.is_verified &&
                    <div className="mt-2 p-5">
                        <button className="bg-main uppercase font-semibold py-2 text-white px-4 rounded-md text-sm relative" type="submit" disabled={fetching} onClick={onVerify}>
                            <span className={fetching ? "opacity-30" : "opacity-100"}>Verify This Seller</span>
                            <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                                {fetching &&
                                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                }
                            </div>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;