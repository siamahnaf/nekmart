import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//Orm entity
import { Cart } from "@/cart/model/cart.entity";
import { Wishlist } from "@/wishlist/model/wishlist.entity";
import { Order } from "@/orders/model/orders.entity";
import { Address } from "@/address/model/address.entity";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Injectable()
export class AnalyticsService {
    //Constructor
    constructor(
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(Wishlist) private wishlistRepository: Repository<Wishlist>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Address) private addressRepository: Repository<Address>
    ) { }

    //Get analytics for user dashboard
    async user(reqUser: ReqUser) {
        const totalCart = await this.cartRepository.count({
            where: {
                user: { id: reqUser.id }
            }
        });
        const totalWishlist = await this.wishlistRepository.count({
            where: {
                user: { id: reqUser.id }
            }
        });
        const totalOrder = await this.orderRepository.count({
            where: {
                user: { id: reqUser.id }
            }
        });
        const defaultAddress = await this.addressRepository.findOne({
            where: {
                user: { id: reqUser.id },
                default: true
            }
        })
        return {
            totalCart,
            totalWishlist,
            totalOrder,
            defaultAddress
        }
    }
}