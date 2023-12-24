import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//Orm Entity
import { Points } from "./model/points.entity";
import { UserPoints } from "./model/user-point.entity";

//Service and Resolver 
import { PointService } from "./points.service";
import { PointResolver } from "./points.resolver";

//Modules
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserPoints, Points]),
        UserModule
    ],
    providers: [PointService, PointResolver],
    exports: [TypeOrmModule]
})

export class PointModule { };