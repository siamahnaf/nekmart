import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

//Entity
import { Preorder } from "./model/preorder.schema";

//Dto
import { PreorderInput } from "./dto/preorder.dto";
import { PreorderNoteInput } from "./dto/update.dto";
import { SearchInput } from "@/user/dto/search.dto";

@Injectable()
export class PreorderService {
    //Constructor
    constructor(
        @InjectRepository(Preorder) private preorderRepository: Repository<Preorder>
    ) { };

    //Get Preorder
    async get(searchInput: SearchInput) {
        const preorders = await this.preorderRepository
            .createQueryBuilder("preorder")
            .orderBy("preorder.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            preorders.where("LOWER(preorder.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Preorder>(preorders, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Add preorder
    async add(preorderInput: PreorderInput) {
        const preorder = this.preorderRepository.create(preorderInput);
        await this.preorderRepository.save(preorder)
        return {
            success: true,
            message: "Preorder request placed successfully!"
        }
    };

    //Update preorder note
    async update(preorderNoteInput: PreorderNoteInput, id: string) {
        const result = await this.preorderRepository.update(id, { note: preorderNoteInput.note });
        if (result.affected === 0) throw new NotFoundException("Pre-order not found!");
        return {
            success: true,
            message: "Pre-order updated successfully!"
        }
    }

    //Delete Preorder
    async delete(id: string) {
        const result = await this.preorderRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException("Pre-order not found!");
        return {
            success: true,
            message: "Pre-order deleted successfully!"
        }
    }
}