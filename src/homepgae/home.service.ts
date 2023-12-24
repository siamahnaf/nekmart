import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//Orm Entity
import { BannerOne } from "./model/banner-one.entity";
import { BannerTwo } from "./model/banner-two.entity";
import { Section } from "./model/section.entity";
import { Product } from "@/product/model/product.entity";

//Dto
import { BannerInput } from "./dto/banner.dto";
import { SectionInput } from "./dto/section.dto";

@Injectable()
export class HomeService {
    //Constructor
    constructor(
        @InjectRepository(BannerOne) private bannerOneRepository: Repository<BannerOne>,
        @InjectRepository(BannerTwo) private bannerTwoRepository: Repository<BannerTwo>,
        @InjectRepository(Section) private sectionRepository: Repository<Section>,
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) { };

    //---------------------------------Banner 1 (One)------------------------------//

    //Get banner
    async getOne() {
        const banners = await this.bannerOneRepository.find({
            order: {
                created_at: "DESC"
            }
        });
        return banners;
    };

    //Add banner
    async addOne(bannerInput: BannerInput) {
        const count = await this.bannerOneRepository.count()
        if (count >= 10) throw new NotFoundException("You can add 10 banner only!");
        const newBanner = this.bannerOneRepository.create(bannerInput);
        await this.bannerOneRepository.save(newBanner);
        return {
            success: true,
            message: "Banner added successfully!"
        }
    };

    //Update banner
    async updateOne(bannerInput: BannerInput, id: string) {
        const result = await this.bannerOneRepository.update(id, bannerInput);
        if (result.affected === 0) throw new NotFoundException("Banner not found!");
        return {
            success: true,
            message: "Banner updated successfully!"
        }
    };

    //Delete banner
    async deleteOne(id: string) {
        try {
            const result = await this.bannerOneRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Banner not found!");
        } catch {
            throw new NotFoundException("Cannot delete banner because it has related record!");
        }
        return {
            success: true,
            message: "Banner Deleted Successfully!"
        }
    }

    //--------------------------------Banner 2 (Two)--------------------------------//

    //Get banner
    async getTwo() {
        const banners = await this.bannerTwoRepository.find({
            order: {
                created_at: "DESC"
            }
        });
        return banners;
    };

    //Add banner
    async addTwo(bannerInput: BannerInput) {
        const count = await this.bannerTwoRepository.count()
        if (count >= 10) throw new NotFoundException("You can add 10 banner only!");
        const newBanner = this.bannerTwoRepository.create(bannerInput);
        await this.bannerTwoRepository.save(newBanner);
        return {
            success: true,
            message: "Banner added successfully!"
        }
    };

    //Update banner
    async updateTwo(bannerInput: BannerInput, id: string) {
        const result = await this.bannerTwoRepository.update(id, bannerInput);
        if (result.affected === 0) throw new NotFoundException("Banner not found!");
        return {
            success: true,
            message: "Banner updated successfully!"
        }
    };

    //Delete banner
    async deleteTwo(id: string) {
        try {
            const result = await this.bannerTwoRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Banner not found!");
        } catch {
            throw new NotFoundException("Cannot delete banner because it has related record!");
        }
        return {
            success: true,
            message: "Banner Deleted Successfully!"
        }
    }


    //-----------------------------------Section part------------------------------//

    //Get sections
    async getSections() {
        let sections = await this.sectionRepository.find({
            relations: {
                category: true
            },
            order: {
                created_at: "DESC"
            }
        });
        return sections;
    };

    //Get single sections
    async getSection(id: string) {
        const sections = await this.sectionRepository.findOne({
            where: { id },
            relations: { category: true }
        });
        if (!sections) throw new NotFoundException("Section id not found!");
        return sections;
    };

    //Get Sections Products
    async getProduct() {
        let sections = await this.sectionRepository.find({
            relations: {
                category: true
            },
            order: {
                created_at: "ASC"
            }
        });
        const results = []
        for (const section of sections) {
            if (section.base === "category") {
                const products = await this.productRepository.find({
                    where: {
                        main_category: { id: section.category.id },
                        visibility: true,
                        is_hide: false,
                        is_approved: true
                    },
                    take: 8,
                    relations: {
                        seller: true,
                        main_category: true,
                        category: true,
                        sub_category: true,
                        brand: true,
                        tag: true,
                        flash: true,
                        attributes: {
                            attributeIds: true
                        },
                        meta: true
                    }
                })
                results.push({ section: section, products: products })
            } else if (section.base === "latest" || section.base === "sale") {
                const products = await this.productRepository.find({
                    order: {
                        created_at: "DESC"
                    },
                    take: 8,
                    relations: {
                        seller: true,
                        main_category: true,
                        category: true,
                        sub_category: true,
                        brand: true,
                        tag: true,
                        flash: true,
                        attributes: {
                            attributeIds: true
                        },
                        meta: true
                    }
                })
                results.push({ section: section, products: products })
            }
        }
        return results;
    }

    //Add section
    async addSection(sectionInput: SectionInput) {
        const count = await this.sectionRepository.count();
        if (count >= 6) throw new NotFoundException("You can add 6 section only!");
        const { category, ...rest } = sectionInput;
        const newSection = this.sectionRepository.create({
            ...rest,
            ...(sectionInput.category !== "" ? { category: { id: sectionInput.category } } : {})
        });
        await this.sectionRepository.save(newSection);
        return {
            success: true,
            message: "Section added successfully!"
        }
    }

    //Update section
    async updateSection(sectionInput: SectionInput, id: string) {
        const { category, ...rest } = sectionInput;
        const result = await this.sectionRepository.update(id, {
            ...rest,
            ...(sectionInput.category !== "" ? { category: { id: sectionInput.category } } : {})
        });
        if (!result) throw new NotFoundException("Section id not found!");
        return {
            success: true,
            message: "Section updated successfully!"
        }
    };

    //Delete Section
    async deleteSection(id: string) {
        try {
            const result = await this.sectionRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Section not found!");
        } catch {
            throw new NotFoundException("Cannot delete section because it has related record!");
        }
        return {
            success: true,
            message: "Section Deleted Successfully!"
        }
    }

}