import { Module } from "@nestjs/common";

//Controller and Service
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { OrderModule } from "@/orders/orders.module";

@Module({
    imports: [OrderModule],
    controllers: [PaymentController],
    providers: [PaymentService]
})

export class PaymentModule { };