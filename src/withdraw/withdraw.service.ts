import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, LessThan, In, MoreThan } from "typeorm";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

//Orm Entity
import { Income } from "./model/income.entity";
import { Withdraw } from "./model/withdraw.entity";
import { Seller } from "@/seller/model/seller.entity";
import { Platform } from "@/platform/model/platform.entity";

//Dto
import { ReleasePaymentInput } from "./dto/payment.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Types
import { ReqUser } from "@/auth/entities/user.types";


@Injectable()
export class WithdrawService {
    //Constructor
    constructor(
        @InjectRepository(Income) private incomeRepository: Repository<Income>,
        @InjectRepository(Withdraw) private withdrawRepository: Repository<Withdraw>,
        @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
        @InjectRepository(Platform) private platformRepository: Repository<Platform>
    ) { }

    //Get withdrawal
    async getByAdmin(sellerId: string, searchInput: SearchInput) {
        const withdraws = await this.withdrawRepository
            .createQueryBuilder("withdraw")
            .where("withdraw.seller.id = :sellerId", { sellerId })
            .leftJoinAndSelect("withdraw.releasedBy", "releasedBy")
            .leftJoinAndSelect("withdraw.seller", "seller")
            .orderBy("withdraw.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            withdraws.where("LOWER(withdraw.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Withdraw>(withdraws, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Get withdrawal
    async getBySeller(searchInput: SearchInput, reqUser: ReqUser) {
        const seller = await this.sellerRepository.findOne({
            where: {
                user: { id: reqUser.id }
            }
        });
        const withdraws = await this.withdrawRepository
            .createQueryBuilder("withdraw")
            .where("withdraw.seller.id = :sellerId", { sellerId: seller.id })
            .where("withdraw.status = :status", { status: "Confirmed" })
            .leftJoinAndSelect("withdraw.releasedBy", "releasedBy")
            .leftJoinAndSelect("withdraw.seller", "seller")
            .orderBy("withdraw.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            withdraws.where("LOWER(withdraw.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Withdraw>(withdraws, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get Incomes
    async getIncome(searchInput: SearchInput, reqUser: ReqUser) {
        const seller = await this.sellerRepository.findOne({
            where: {
                user: { id: reqUser.id }
            }
        });
        const incomes = await this.incomeRepository
            .createQueryBuilder("income")
            .where("income.seller.id = :sellerId", { sellerId: seller.id })
            .leftJoinAndSelect("income.orderId", "orderId")
            .orderBy("income.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            incomes.where("LOWER(income.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }
        const { items, meta } = await paginate<Income>(incomes, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get Income Statics
    async getStatics(sellerId: string, reqUser: ReqUser) {
        if (reqUser.role === "Seller") {
            const seller = await this.sellerRepository.findOne({
                where: {
                    user: { id: reqUser.id }
                }
            });
            if (seller.id !== sellerId) throw new NotFoundException("Something went wrong!")
        }
        let date = new Date();
        date = new Date(date.setDate(date.getDate() - 15));
        const currentIncomes = await this.incomeRepository.find({
            where: {
                created_at: LessThan(date),
                seller: { id: sellerId },
                paySuccess: false
            }
        });
        const upcomingIncomes = await this.incomeRepository.find({
            where: {
                created_at: MoreThan(date),
                seller: { id: sellerId },
                paySuccess: false
            }
        });
        const lastWithdraw = await this.withdrawRepository.findOne({
            where: {
                seller: { id: sellerId }
            },
            order: {
                created_at: "DESC"
            }
        });
        return {
            currentIncomes,
            upcomingIncomes,
            lastPaymentDate: lastWithdraw?.created_at || null
        }
    }

    //Get processing payment from seller
    async process(reqUser: ReqUser) {
        const seller = await this.sellerRepository.findOne({
            where: {
                user: { id: reqUser.id }
            }
        });

        const withdrawal = await this.withdrawRepository.find({
            where: {
                status: "Processing",
                seller: { id: seller.id }
            },
            relations: {
                seller: true,
                releasedBy: true
            }
        });

        return withdrawal;
    }


    //Release payment
    async release(paymentInput: ReleasePaymentInput, reqUser: ReqUser) {
        let date = new Date();
        date = new Date(date.setDate(date.getDate() - 15));
        const income = await this.incomeRepository.find({
            where: {
                created_at: LessThan(date),
                seller: { id: paymentInput.seller },
                paySuccess: false
            }
        });
        const platform = await this.platformRepository.findOne({
            where: {}
        });
        let total = income.reduce((acc, item) => Number(item.income) + acc, 0);
        total = Math.round(total - (total * (Number(platform.charge) / 100)));
        if (paymentInput.amount !== total) throw new NotFoundException("Something went wrong!");
        const newPayment = this.withdrawRepository.create({
            ...paymentInput,
            seller: { id: paymentInput.seller },
            releasedBy: { id: reqUser.id },
        });
        await this.withdrawRepository.save(newPayment);
        await this.incomeRepository.update({
            id: In(paymentInput.incomesIds)
        }, { paySuccess: true });

        return {
            success: true,
            message: "Payment released successfully!"
        }
    }

    //Confirm payment by seller
    async confirm(withdrawId: string) {
        const result = await this.withdrawRepository.update(withdrawId, {
            status: "Confirmed"
        });
        if (result.affected === 0) throw new NotFoundException("Withdraw release not found!");
        return {
            success: true,
            message: "Payment confirmed!"
        }
    }
}