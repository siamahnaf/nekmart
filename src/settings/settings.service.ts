import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//Orm Entity
import { Settings } from "./model/setting.entity";

//Dto
import { SettingsInput } from "./dto/settings.dto";

@Injectable()
export class SettingService {
    //Constructor
    constructor(
        @InjectRepository(Settings) private settingRepository: Repository<Settings>
    ) { };

    //Get Site Settings
    async get() {
        const sites = await this.settingRepository.findOne({
            where: {}
        });
        if (!sites) throw new NotFoundException("Please update your site settings first!")
        return sites;
    }

    //Save or add site settings
    async site(siteInput: SettingsInput) {
        const setting = await this.settingRepository.findOne({
            where: {}
        });
        if (!setting) {
            const newSetting = this.settingRepository.create(siteInput);
            await this.settingRepository.save(newSetting);
        } else {
            await this.settingRepository.update(setting.id, siteInput);
        }
        return {
            success: true,
            message: "Settings saved successfully!"
        }
    }
}