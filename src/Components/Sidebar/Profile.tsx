import Image from "next/image";

//Helpers
import { isUrl } from "@/Helpers/url.helpers";

//Urql
import { useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GetProfileData } from "@/Urql/Types/Authentication/auth.types";

const Profile = () => {
    //Urql
    const [{ data }] = useQuery<GetProfileData>({ query: GET_PROFILE });

    return (
        <div className="bg-main text-white text-center py-8 px-2">
            <div>
                {data?.getProfile?.avatar ? (
                    <Image src={isUrl(data.getProfile.avatar) ? data.getProfile.avatar : (process.env.NEXT_PUBLIC_IMAGE_URL + data.getProfile.avatar)} alt={data.getProfile?.name || "Profile"} width={60} height={60} className="w-[60px] h-[60px] rounded-full mx-auto" />
                ) : (
                    <Image src="/images/avatar.png" alt={data?.getProfile?.name || "profile"} width={60} height={60} className="w-[60px] h-[60px] rounded-full mx-auto" />
                )}
            </div>
            <h6 className="font-bold text-lg mt-4">{data?.getProfile.name}</h6>
            <p className="text-base">+{data?.getProfile.phone}</p>
            <p className="text-sm opacity-60 capitalize">{data?.getProfile.role}</p>
        </div>
    );
};

export default Profile;