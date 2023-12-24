import { SuccessInfo } from "../Success.types";
import { MetaInfo } from "../Meta.types";
import { SellerData } from "../Authentication/profile.types";
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
    orderId?: {
        orderId: string;
    }
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

export interface GetIncomeData {
    getIncomeHistory: {
        results: IncomeData[];
        meta: MetaInfo
    }
}

export interface ConfirmPaymentData {
    confirmPayment: SuccessInfo;
}

export interface GetProcessingWithdraw {
    getProcessingWithdraw: WithdrawData[];
}

export interface AddBankInformation {
    addBankInformation: SuccessInfo;
}

export interface GetPreviousWithdraw {
    getWithdrawalBySeller: {
        results: WithdrawData[];
        meta: MetaInfo;
    }
}

export interface GetProcessingWithdraw {
    getProcessingWithdraw: WithdrawData[];
}

export interface ConfirmPaymentData {
    confirmPayment: SuccessInfo;
}