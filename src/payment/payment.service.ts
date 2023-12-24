import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";

//Orm Entity
import { Order } from "@/orders/model/orders.entity";

//Dto
import { SuccessDto } from "./dto/success.dto";
import { CancelDto } from "./dto/cancel.dto";
import { FailedDto } from "./dto/failed.dto";

@Injectable()
export class PaymentService {
    //Constructor
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>
    ) { }

    //Success
    async success(successDto: SuccessDto, res: Response) {
        await this.orderRepository.update({
            orderId: successDto.tran_id
        }, {
            paymentStatus: true,
            payment: {
                paymentMethod: "online",
                paymentId: successDto.val_id,
                provider: successDto.card_type
            }
        });
        res.redirect(302, `http://localhost:3000/order/success/${successDto.tran_id.replace("NEK-", "")}`);
    }

    //Cancel
    async cancel(cancelDto: CancelDto, res: Response) {
        res.redirect(302, `http://localhost:3000/order/cancel/${cancelDto.tran_id.replace("NEK-", "")}`);
    }

    //Failed
    async failed(failedDto: FailedDto, res: Response) {
        res.redirect(302, `http://localhost:3000/order/failed/${failedDto.tran_id.replace("NEK-", "")}`);
    }
}