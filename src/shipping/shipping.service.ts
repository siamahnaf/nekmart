import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

//Orm Entity
import { Shipping } from "./model/shipping.entity";

//Dto
import { ShippingInput } from "./dto/shipping.dto";
import { SearchInput } from "@/user/dto/search.dto";

@Injectable()
export class ShippingService {
    //Constructor
    constructor(
        @InjectRepository(Shipping) private shippingRepository: Repository<Shipping>
    ) { };

    //Get Shipping
    async get(searchInput: SearchInput) {
        const shippings = await this.shippingRepository
            .createQueryBuilder("shipping")
            .orderBy("shipping.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            shippings.where("LOWER(shipping.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Shipping>(shippings, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Get single shipping
    async getSingle(id: string) {
        const shipping = await this.shippingRepository.findOne({
            where: {
                id
            }
        });
        if (!shipping) throw new NotFoundException("Shipping not found!");
        return shipping;
    }

    // Get Active Shipping
    async getActive() {
        const shipping = await this.shippingRepository.findOne({
            where: {
                active: true
            }
        });
        if (!shipping) throw new NotFoundException("Shipping not found!");
        return shipping;
    }

    //Add Shipping
    async add(shippingInput: ShippingInput) {
        const shipping = await this.shippingRepository.findOneBy({
            name: shippingInput.name
        });
        if (shipping) throw new NotFoundException("Shipping method already added!");
        const totalShippings = await this.shippingRepository.find();
        const newShipping = this.shippingRepository.create({
            ...shippingInput,
            active: totalShippings.length === 0 ? true : false
        });
        await this.shippingRepository.save(newShipping);
        return {
            success: true,
            message: "Shipping created successfully!"
        }
    }

    //Update Shipping
    async update(shippingInput: ShippingInput, id: string) {
        const shipping = await this.shippingRepository.findOneBy({
            id
        });
        if (!shipping) throw new NotFoundException("Shipping not found!");
        if (shipping.name !== shippingInput.name) {
            const hasShipping = await this.shippingRepository.findOneBy({
                name: shippingInput.name
            });
            if (hasShipping) throw new NotFoundException("Shipping already listed");
        }
        await this.shippingRepository.update(id, shippingInput);
        return {
            success: true,
            message: "Shipping updated successfully!"
        }
    }

    //Set shipping as active
    async status(id: string) {
        await this.shippingRepository.update({
            active: true
        }, { active: false });
        const result = await this.shippingRepository.update(id, { active: true });
        if (result.affected === 0) throw new NotFoundException("Shipping not found!");
        return {
            success: true,
            message: "Shipping method set a active successfully!"
        }
    }

    //Delete Shipping
    async delete(id: string) {
        const shipping = await this.shippingRepository.findOneBy({
            id,
            active: true
        });
        if (shipping) throw new NotFoundException("Active shipping method can't be deleted!");
        try {
            const result = await this.shippingRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Shipping method not found!");
        } catch {
            throw new NotFoundException("Cannot delete shipping method because it has related record!");
        }
        return {
            success: true,
            message: "Shipping method Deleted Successfully!"
        }
    }
}