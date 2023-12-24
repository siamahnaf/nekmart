import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

//Orm Entity
import { Brand } from "./model/brand.entity";

//Dto
import { BrandInput } from "./dto/brand.dto";
import { SearchInput } from "@/user/dto/search.dto";

@Injectable()
export class BrandService {
    //Constructor
    constructor(
        @InjectRepository(Brand) private brandRepository: Repository<Brand>
    ) { };

    //Get Brands
    async getBrands(searchInput: SearchInput) {
        const brands = await this.brandRepository
            .createQueryBuilder("brand")
            .orderBy("brand.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            brands.where("LOWER(brand.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Brand>(brands, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Get Single Brands
    async getBrand(id: string) {
        const brand = await this.brandRepository.findOne({
            where: {
                id: id
            }
        });
        if (!brand) throw new NotFoundException("Brand not found!");
        return brand;
    }

    //Add Brand
    async add(brandInput: BrandInput) {
        const brand = await this.brandRepository.findOneBy({
            name: brandInput.name
        });
        if (brand) throw new NotFoundException("Brand is already created!");
        const newBrand = this.brandRepository.create(brandInput);
        await this.brandRepository.save(newBrand);
        return {
            success: true,
            message: "Brand created successfully!"
        }
    }

    //Update Brand
    async update(id: string, brandInput: BrandInput) {
        const brand = await this.brandRepository.findOneBy({
            id: id
        });
        if (!brand) throw new NotFoundException("Brand not found!");
        if (brand.name !== brandInput.name) {
            const hasBrand = await this.brandRepository.findOneBy({
                name: brandInput.name
            });
            if (hasBrand) throw new NotFoundException("Brand is already listed!");
        }
        await this.brandRepository.update(brand.id, brandInput);
        return {
            success: true,
            message: "Brand updated successfully!"
        }
    }

    //Delete Brand
    async delete(id: string) {
        try {
            const result = await this.brandRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Brand not found!");
        } catch {
            throw new NotFoundException("Cannot delete brand because it has related record!");
        }
        return {
            success: true,
            message: "Brand Deleted Successfully!"
        }
    }
}