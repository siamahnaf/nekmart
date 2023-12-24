import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as SSLCommerzPayment from "sslcommerz-lts";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

//Initialize Payment
const store_id = "siama65240eb6d35cb"
const store_passwd = "siama65240eb6d35cb@ssl"
const is_live = false;

//Helpers
import { getOrderId } from "@/helper/orderId.helper";

//Orm Entity
import { OrderProduct } from "./model/order-product.entity";
import { OrderSeller } from "./model/order-seller.entity";
import { Order } from "./model/orders.entity";
import { Seller } from "@/seller/model/seller.entity";
import { Address } from "@/address/model/address.entity";
import { Cart } from "@/cart/model/cart.entity";
import { Points } from "@/points/model/points.entity";
import { UserPoints } from "@/points/model/user-point.entity";
import { Refundable } from "@/refund/model/refundable.entity";
import { Income } from "@/withdraw/model/income.entity";

//Dto
import { OrderInput } from "./dto/orders.dto";
import { TrackInput } from "./dto/track.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Injectable()
export class OrderService {
    //Constructor
    constructor(
        @InjectRepository(OrderProduct) private productRepository: Repository<OrderProduct>,
        @InjectRepository(OrderSeller) private orderSellerRepository: Repository<OrderSeller>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
        @InjectRepository(Address) private addressRepository: Repository<Address>,
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(Points) private pointRepository: Repository<Points>,
        @InjectRepository(UserPoints) private userPointRepository: Repository<UserPoints>,
        @InjectRepository(Refundable) private refundableRepository: Repository<Refundable>,
        @InjectRepository(Income) private incomeRepository: Repository<Income>
    ) { };

    //Get Orders
    async getOrders(searchInput: SearchInput) {
        const orders = await this.orderRepository
            .createQueryBuilder("order")
            .leftJoinAndSelect("order.sellers", "sellers")
            .leftJoinAndSelect("order.user", "user")
            .orderBy("order.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            orders.where("LOWER(order.orderId) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Order>(orders, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get Single order
    async getOrder(id: string) {
        const order = await this.orderRepository.findOne({
            where: {
                id: id
            },
            relations: {
                sellers: {
                    sellerId: true,
                    products: {
                        productId: true
                    }
                },
                shippingAddress: true,
                billingAddress: true,
                user: true
            }
        });
        if (!order) throw new NotFoundException("Order not found!");
        return order;
    };

    //Get orders by user
    async getOrderByUser(reqUser: ReqUser) {
        const orders = await this.orderRepository.find({
            where: {
                user: { id: reqUser.id }
            },
            relations: {
                sellers: {
                    sellerId: true,
                    products: {
                        productId: true
                    }
                },
                shippingAddress: true,
                billingAddress: true,
                user: true
            },
            order: {
                created_at: "DESC"
            }
        });
        return orders;
    }

    //Get Single Order by user
    async getSingleByUser(reqUser: ReqUser, id: string) {
        const order = await this.orderRepository.findOne({
            where: {
                id: id,
                user: { id: reqUser.id }
            },
            relations: {
                sellers: {
                    sellerId: true,
                    products: {
                        productId: true
                    }
                },
                shippingAddress: true,
                billingAddress: true,
                user: true
            }
        });
        if (!order) throw new NotFoundException("Order not found!");
        return order;
    };

    //Get order by seller
    async getOrderBySeller(reqUser: ReqUser, searchInput: SearchInput) {
        const seller = await this.sellerRepository.findOne({
            where: {
                user: { id: reqUser.id }
            }
        });
        if (!seller) throw new NotFoundException("Seller not found!");
        const orderSellers = await this.orderSellerRepository
            .createQueryBuilder("orderSeller")
            .leftJoinAndSelect("orderSeller.sellerId", "sellerId")
            .leftJoinAndSelect("orderSeller.order", "order")
            .leftJoinAndSelect("order.shippingAddress", "shippingAddress")
            .orderBy("orderSeller.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            orderSellers.andWhere("LOWER(orderSeller.shopName) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }
        const { items, meta } = await paginate<OrderSeller>(orderSellers, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Get single order by seller
    async getSingleBySeller(orderSellerId: string, reqUser: ReqUser) {
        const seller = await this.sellerRepository.findOne({
            where: {
                user: { id: reqUser.id }
            }
        });
        if (!seller) throw new NotFoundException("Seller not found!");
        const sellerOrder = await this.orderSellerRepository.findOne({
            where: {
                sellerId: { id: seller.id },
                id: orderSellerId
            },
            relations: {
                sellerId: true,
                products: {
                    productId: true
                },
                order: true
            }
        });
        if (!sellerOrder) throw new NotFoundException("Seller order not found!")
        return sellerOrder;
    }

    //Track order
    async track(trackInput: TrackInput) {
        const track = await this.orderRepository.findOne({
            where: {
                orderId: trackInput.trackId
            },
            relations: {
                sellers: {
                    sellerId: true,
                    products: {
                        productId: true
                    }
                },
                shippingAddress: true,
                billingAddress: true,
                user: true
            }
        });
        if (!track) throw new NotFoundException("Order not found!");
        return track;
    }

    //Add Order
    async add(orderInput: OrderInput, reqUser: ReqUser) {
        const orderId = getOrderId();
        const { sellers, cartId, ...orderData } = orderInput;

        const order = this.orderRepository.create({
            ...orderData,
            orderId,
            shippingAddress: { id: orderData.shippingAddress },
            billingAddress: { id: orderData.billingAddress },
            user: { id: reqUser.id },
        });
        for (const seller of sellers) {
            const { products, ...sellerData } = seller;

            const orderSeller = this.orderSellerRepository.create({
                ...sellerData,
                sellerId: { id: seller.sellerId },
                order,
                products: [],
            });

            for (const product of products) {
                const refundable = await this.refundableRepository.create({
                    user: { id: reqUser.id },
                    productId: { id: product.productId },
                    quantity: product.quantity,
                    variation: product.variation,
                    orderID: orderId,
                    seller: { id: seller.sellerId },
                    address: { id: orderInput.shippingAddress },
                    couponDiscount: orderInput.couponDiscount,
                    amount: product.amount
                });
                await this.refundableRepository.save(refundable);
                const orderProduct = this.productRepository.create({
                    ...product,
                    productId: { id: product.productId },
                });
                orderSeller.products.push(orderProduct);
                await this.productRepository.save(orderProduct);
            }
            await this.orderSellerRepository.save(orderSeller);
        }
        await this.cartRepository.delete(orderInput.cartId);
        const address = await this.addressRepository.findOne({
            where: {
                id: orderInput.shippingAddress
            }
        });
        if (orderInput.payment.paymentMethod === "online") {
            const data = {
                total_amount: orderInput.subtotal,
                currency: "BDT",
                tran_id: orderId,
                success_url: "http://localhost:3001/payment/success",
                fail_url: "http://localhost:3001/payment/failed",
                cancel_url: "http://localhost:3001/payment/cancel",
                shipping_method: "home delivery",
                product_name: "General product",
                product_category: "General Category",
                product_profile: "General",
                cus_name: address.name,
                cus_add1: address.address,
                cus_email: address.phone,
                cus_phone: address.phone,
                cus_city: address.city,
                cus_state: address.area,
                cus_postcode: address.postal,
                cus_country: "Bangladesh",
                ship_name: address.phone,
                ship_add1: address.address,
                ship_city: address.city,
                ship_state: address.area,
                ship_postcode: address.postal,
                ship_country: "Bangladesh"
            };
            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
            const sslResponse = await sslcz.init(data);
            return {
                success: true,
                message: "Order placed successfully!",
                redirectUri: sslResponse.GatewayPageURL
            }
        } else {
            return {
                success: true,
                message: "Order placed successfully!",
                redirectUri: `/order/success/${orderId.replace("NEK-", "")}`
            }
        }
    };

    //Pay again
    async pay(orderId: string, reqUser: ReqUser) {
        const order = await this.orderRepository.findOne({
            where: {
                orderId: orderId,
                user: { id: reqUser.id }
            },
            relations: {
                shippingAddress: true
            }
        });
        if (!order) throw new NotFoundException("Order not found!");
        const data = {
            total_amount: order.subtotal,
            currency: "BDT",
            tran_id: orderId,
            success_url: "http://localhost:3001/payment/success",
            fail_url: "http://localhost:3001/payment/failed",
            cancel_url: "http://localhost:3001/payment/cancel",
            shipping_method: "home delivery",
            product_name: "General product",
            product_category: "General Category",
            product_profile: "General",
            cus_name: order.shippingAddress.name,
            cus_add1: order.shippingAddress.address,
            cus_email: order.shippingAddress.phone,
            cus_phone: order.shippingAddress.phone,
            cus_city: order.shippingAddress.city,
            cus_state: order.shippingAddress.area,
            cus_postcode: order.shippingAddress.postal,
            cus_country: "Bangladesh",
            ship_name: order.shippingAddress.phone,
            ship_add1: order.shippingAddress.address,
            ship_city: order.shippingAddress.city,
            ship_state: order.shippingAddress.area,
            ship_postcode: order.shippingAddress.postal,
            ship_country: "Bangladesh"
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const sslResponse = await sslcz.init(data);
        if (!sslResponse.GatewayPageURL) throw new NotFoundException("Something went wrong!")
        return {
            success: true,
            message: "Order placed successfully!",
            redirectUri: sslResponse.GatewayPageURL
        }
    }

    //Change status by admin
    async adminStatus(orderSellerId: string, status: string) {
        const orderSeller = await this.orderSellerRepository.findOne({
            where: {
                id: orderSellerId
            },
            relations: {
                sellerId: true
            }
        });
        if (!orderSeller) throw new NotFoundException("Order not found!");
        if (orderSeller.status === "Delivered") throw new NotFoundException("You can't change a delivered order status!");
        if (orderSeller.status === "Cancelled") throw new NotFoundException("You can't change a cancelled order status!");
        const order = await this.orderRepository.findOne({
            where: {
                sellers: { id: orderSeller.id }
            },
            relations: {
                user: true
            }
        })
        if (status === "Delivered") {
            const newPoints = await this.pointRepository.create({
                points: Math.round(orderSeller.price / 10),
                user: { id: order.user.id },
                order: { id: order.id }
            });
            await this.refundableRepository.update({
                user: { id: order.user.id },
                orderID: order.orderId
            }, { refundable: true, order: { id: order.id } });
            await this.pointRepository.save(newPoints);
            const userPoint = await this.userPointRepository.findOne({
                where: {
                    user: { id: order.user.id }
                }
            });
            if (userPoint) {
                await this.userPointRepository.increment({
                    id: userPoint.id,
                    user: { id: order.user.id }
                }, "points", Math.round(orderSeller.price / 10));
            } else {
                const newUserPoints = this.userPointRepository.create({
                    points: Math.round(orderSeller.price / 10),
                    user: { id: order.user.id }
                });
                await this.userPointRepository.save(newUserPoints);
            }
            const newIncome = await this.incomeRepository.create({
                seller: { id: orderSeller.sellerId.id },
                orderId: { id: order.id },
                income: orderSeller.price
            });
            await this.incomeRepository.save(newIncome);
        }
        await this.orderSellerRepository.update(orderSellerId, {
            status: status
        });
        return {
            success: true,
            message: "Order status changed successfully!"
        }
    }

    //Cancel order status by admin
    async cancelByAdmin(orderSellerId: string) {
        const orderSeller = await this.orderSellerRepository.findOne({
            where: {
                id: orderSellerId
            }
        });
        if (!orderSeller) throw new NotFoundException("Order not found!");
        if (orderSeller.status === "Delivered") throw new NotFoundException("You can't change a delivered order status")
        await this.orderSellerRepository.update(orderSellerId, {
            status: "Cancelled",
            cancelBy: "admin"
        });
        return {
            success: true,
            message: "Order cancelled successfully!"
        }
    }

    //Cancel order by user
    async cancelByUser(orderSellerId: string) {
        const orderSeller = await this.orderSellerRepository.findOne({
            where: {
                id: orderSellerId
            }
        });
        if (!orderSeller) throw new NotFoundException("Order not found!");
        if (orderSeller.status === "Delivered") throw new NotFoundException("You can't change a cancelled order status")
        await this.orderSellerRepository.update(orderSellerId, {
            status: "Cancelled",
            cancelBy: "user"
        });
        return {
            success: true,
            message: "Order cancelled successfully!"
        }
    }

    //Change order notes
    async note(note: string, id: string) {
        const result = await this.orderRepository.update(id, { note });
        if (result.affected === 0) throw new NotFoundException("Order not found!");
        return {
            success: true,
            message: "Order note updated successfully!"
        }
    };
}