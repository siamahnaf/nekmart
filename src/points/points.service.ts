import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//Entity
import { UserPoints } from "./model/user-point.entity";
import { Points } from "./model/points.entity";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Injectable()
export class PointService {
    //Constructor
    constructor(
        @InjectRepository(UserPoints) private userPointRepository: Repository<UserPoints>,
        @InjectRepository(Points) private pointRepository: Repository<Points>
    ) { };

    //Get Points
    async get(reqUser: ReqUser) {
        const points = await this.pointRepository.find({
            where: {
                user: { id: reqUser.id }
            },
            order: {
                created_at: "DESC"
            },
            relations: {
                order: true
            }
        });
        return points;
    };

    //Get User Points
    async getPoints(reqUser: ReqUser) {
        const points = await this.userPointRepository.findOne({
            where: {
                user: { id: reqUser.id }
            }
        });
        return points;
    }
}