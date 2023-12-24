import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//Orm entity
import { Address } from "./model/address.entity";

//Dto
import { AddressInput } from "./dto/address.dto";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Injectable()
export class AddressService {
    //Constructor
    constructor(
        @InjectRepository(Address) private addressRepository: Repository<Address>
    ) { };

    //Get Address
    async get(reqUser: ReqUser) {
        const address = await this.addressRepository.find({
            where: {
                user: { id: reqUser.id }
            },
            order: {
                created_at: "ASC"
            }
        });
        return address;
    }

    //Add Address
    async add(addressInput: AddressInput, reqUser: ReqUser) {
        const address = await this.addressRepository.count({
            where: {
                user: { id: reqUser.id }
            }
        });
        const newAddress = this.addressRepository.create({ ...addressInput, default: address === 0 ? true : false, user: { id: reqUser.id } });
        await this.addressRepository.save(newAddress);
        return {
            success: true,
            message: "Address added successfully!"
        }
    };

    //Update Address
    async update(addressInput: AddressInput, id: string) {
        const result = await this.addressRepository.update(id, addressInput);
        if (result.affected === 0) throw new NotFoundException("Address not found!");
        return {
            success: true,
            message: "Address updated successfully!"
        }
    };

    // Mark address as default address
    async mark(id: string, reqUser: ReqUser) {
        await this.addressRepository.update({}, { default: false });
        await this.addressRepository.update({
            user: { id: reqUser.id },
            id: id
        }, { default: true });
        return {
            success: true,
            message: "Address is marked as default!"
        }
    };

    //Delete Address
    async delete(id: string) {
        const address = await this.addressRepository.findOne({
            where: { id }
        })
        if (address.default === true) throw new NotFoundException("Default address can't be deleted!");
        await this.addressRepository.softDelete({
            id
        });
        return {
            success: true,
            message: "Address deleted successfully!"
        }
    };
}