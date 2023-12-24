import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { HttpModule } from "@nestjs/axios";

//Orm entity
import { User } from "./model/user.entity";
import { Session } from "./model/session.entity";

//Service and Resolver
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([User, Session]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: "90day" }
        }),
        HttpModule
    ],
    providers: [UserService, UserResolver],
    exports: [TypeOrmModule, JwtModule]
})

export class UserModule { };