import { useState } from "react";
import Link from "next/link";

//Components
import AddBankInformation from "./AddBankInformation";

//Urql
import { useQuery } from "urql";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";
import { GET_INCOME_STATISTIC } from "@/Urql/Query/Withdraw/withdraw.query";
import { GetIncomeStatics } from "@/Urql/Types/Withdraw/withdraw.types";
import { GetSellerProfileData } from "@/Urql/Types/Authentication/profile.types";

const Statics = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    //Urql
    const [{ data: sellerProfile }] = useQuery<GetSellerProfileData>({ query: GET_SELLER_PROFILE })
    const [{ data }, refetch] = useQuery<GetIncomeStatics>({ query: GET_INCOME_STATISTIC, variables: { sellerId: sellerProfile?.getSellerProfile.id } });

    //Handler
    const getIncomes = () => {
        let upcomingIncome = data?.getIncomeStatics?.upcomingIncomes?.reduce((acc, item) => (item?.income || 0) + acc, 0) || 0;

        let currentIncome = data?.getIncomeStatics?.currentIncomes?.reduce((acc, item) => (item.income || 0) + acc, 0) || 0;

        return {
            upcomingIncome,
            currentIncome
        }
    }

    return (
        <div className="border border-solid border-gray-300 rounded">
            <h4 className="px-3 py-3 border-b border-solid border-gray-300">Basic Information</h4>
            <div className="p-5">
                <div className="grid grid-cols-2 gap-4 w-[60%] mx-auto">
                    <div className="bg-gradient-to-br from-[#eb4786] to-[#b854a6] rounded-md text-white">
                        <div className="p-5">
                            <h3 className="text-3xl font-semibold mb-1">৳{getIncomes().currentIncome}</h3>
                            <p className="text-[15px] opacity-60 mb-px">Current Income</p>
                            <p className="text-[13px] opacity-60">(Include platform charge)</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFFFFF" fill-opacity="0.3" d="M0,192L26.7,192C53.3,192,107,192,160,202.7C213.3,213,267,235,320,218.7C373.3,203,427,149,480,117.3C533.3,85,587,75,640,90.7C693.3,107,747,149,800,149.3C853.3,149,907,107,960,112C1013.3,117,1067,171,1120,202.7C1173.3,235,1227,245,1280,213.3C1333.3,181,1387,107,1413,69.3L1440,32L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
                    </div>
                    <div className="bg-gradient-to-br from-[#875fc0] to-[#5346ba] rounded-md text-white">
                        <div className="p-5">
                            <h3 className="text-3xl font-semibold mb-1">৳{getIncomes().upcomingIncome}</h3>
                            <p className="text-[15px] opacity-60 mb-px">Current Income</p>
                            <p className="text-[13px] opacity-60">(Include platform charge)</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFFFFF" fill-opacity="0.3" d="M0,192L30,208C60,224,120,256,180,245.3C240,235,300,181,360,144C420,107,480,85,540,96C600,107,660,149,720,154.7C780,160,840,128,900,117.3C960,107,1020,117,1080,112C1140,107,1200,85,1260,74.7C1320,64,1380,64,1410,64L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
                    </div>
                </div>
                <div className="mt-8 flex gap-5">
                    <div className="flex-1">
                        <button className="bg-main py-2 px-3 text-sm text-white rounded-md w-max mx-auto" onClick={() => setOpen(true)}>
                            Add Bank Information
                        </button>
                    </div>
                    <Link href="/money-withdraw/previous-withdraw" className="bg-main py-2 px-3 text-sm text-white rounded-md w-max mx-auto">
                        Previous Withdraw
                    </Link>
                </div>
            </div>
            <AddBankInformation
                open={open}
                onClose={() => setOpen(false)}
            />
        </div>
    );
};

export default Statics;