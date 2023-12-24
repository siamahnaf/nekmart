import { SuccessInfo } from "../Success.types";
import { MetaInfo } from "../Meta.types";
import { SellerData } from "../Seller/seller.types";
import { ProfileData } from "../Authentication/auth.types";

export interface WithdrawData {
    id: string;
    seller?: SellerData;
    amount: number;
    releasedBy?: ProfileData;
    method: string;
    status: string;
    created_at: Date;
}

export interface IncomeData {
    id: string;
    seller?: SellerData;
    user?: ProfileData;
    income?: number;
    paySuccess?: boolean;
    created_at: Date;
}

export interface IncomeStaticsData {
    currentIncomes?: IncomeData[];
    upcomingIncomes?: IncomeData[];
    lastPaymentDate: Date;
}


export interface GetIncomeStatics {
    getIncomeStatics: IncomeStaticsData
}

export interface GetWithdrawData {
    getWithdrawalByAdmin: {
        results: WithdrawData[];
        meta: MetaInfo
    }
}

export interface ReleasePaymentData {
    releasePayment: SuccessInfo;
}