import { Controller, Post, Body, Res } from "@nestjs/common";
import { Response } from "express";

//Service
import { PaymentService } from "./payment.service";

//Dto
import { SuccessDto } from "./dto/success.dto";
import { CancelDto } from "./dto/cancel.dto";
import { FailedDto } from "./dto/failed.dto";

@Controller("payment")
export class PaymentController {
    //Constructor
    constructor(
        private readonly paymentService: PaymentService
    ) { };

    @Post("success")
    paymentSuccess(@Body() successDto: SuccessDto, @Res() res: Response) {
        return this.paymentService.success(successDto, res);
    }

    @Post("cancel")
    paymentCancel(@Body() cancelDto: CancelDto, @Res() res: Response) {
        return this.paymentService.cancel(cancelDto, res);
    }

    @Post("failed")
    paymentFailed(@Body() failedDto: FailedDto, @Res() res: Response) {
        return this.paymentService.failed(failedDto, res);
    }
}