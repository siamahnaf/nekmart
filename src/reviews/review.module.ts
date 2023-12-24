import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm entity
import { Review } from "./model/reviews.entity";

//Service and Resolver
import { ReviewService } from "./review.service";
import { ReviewResolver } from "./review.resolver";

//Module
import { UserModule } from "src/user/user.module";
import { SellerModule } from "src/seller/seller.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Review]),
        UserModule,
        SellerModule
    ],
    providers: [ReviewService, ReviewResolver]
})

export class ReviewModule { };