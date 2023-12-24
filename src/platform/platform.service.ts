import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//Orm entity
import { Platform } from "./model/platform.entity";

//Dto
import { PlatformInput } from "./dto/platform.dto";

@Injectable()
export class PlatformService {
    //Constructor
    constructor(
        @InjectRepository(Platform) private platformRepository: Repository<Platform>
    ) { };

    //Get platforms
    async get() {
        const platform = await this.platformRepository.findOne({
            where: {}
        });
        if (!platform) throw new NotFoundException("Platform charge is not set yet!");
        return platform;
    }

    //Add platform
    async add(platformInput: PlatformInput) {
        const platform = await this.platformRepository.findOneBy({});
        if (platform) {
            await this.platformRepository.update(platform.id, {
                charge: platformInput.charge
            })
            return {
                success: true,
                message: "Platform updated successfully!"
            }
        } else {
            const newPlatform = this.platformRepository.create({ charge: platformInput.charge });
            await this.platformRepository.save(newPlatform);
            return {
                success: true,
                message: "Platform added successfully!"
            }
        }
    }
}