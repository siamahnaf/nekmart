import Image from "next/image";

//Urql
import { useQuery } from "urql";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";
import { GetSellerProfileData } from "@/Urql/Types/Authentication/profile.types";

const Profile = () => {
    //Urql
    const [{ data }] = useQuery<GetSellerProfileData>({ query: GET_SELLER_PROFILE });

    return (
        <div className="border-b border-solid border-gray-200 pb-4">
            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL as string + data?.getSellerProfile.banner} alt={data?.getSellerProfile.shopName as string} width={1600} height={300} />
            <div className="flex items-end gap-3 -mt-6 px-5">
                <div>
                    <Image src={process.env.NEXT_PUBLIC_IMAGE_URL as string + data?.getSellerProfile.logo as string} alt={data?.getSellerProfile.shopName as string} width={300} height={300} className="border-2 border-solid border-main rounded-full w-[80px] h-[80px]" />
                </div>
                <div className="mb-2">
                    <h4 className="text-base font-bold">{data?.getSellerProfile.shopName}</h4>
                    <p className="text-sm">+{data?.getSellerProfile.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;