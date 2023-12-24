import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, In } from "typeorm";
import { Cron, CronExpression } from "@nestjs/schedule";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

//Schema
import { Product } from "./model/product.entity";
import { ProductAttribute } from "./model/attribute.entity";
import { Meta } from "./model/meta.entity";
import { Seller } from "@/seller/model/seller.entity";
import { Attribute } from "@/attributes/model/attributes.entity";
import { SubCategory } from "@/category/model/sub-category.entity";
import { Tag } from "@/tag/model/tag.entity";
import { Flash } from "@/flash/model/flash.entity";

//Dto
import { ProductInput } from "./dto/product.dto";
import { ProductSearchInput } from "./dto/product-search.dto";
import { SearchInput } from "@/user/dto/search.dto";
import { UpdateFlashProductInput } from "./dto/update-flash-product.dto";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Injectable()
export class ProductService {
    //Constructor
    constructor(
        @InjectRepository(ProductAttribute) private productAttrRepository: Repository<ProductAttribute>,
        @InjectRepository(Meta) private metaRepository: Repository<Meta>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
        @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>,
        @InjectRepository(SubCategory) private subRepository: Repository<SubCategory>,
        @InjectRepository(Tag) private tagRepository: Repository<Tag>,
        @InjectRepository(Flash) private flashRepository: Repository<Flash>
    ) { };

    //Cron Job form Delete expired Flash, and Update It's product
    @Cron(CronExpression.EVERY_HOUR)
    async handleCron() {

    }

    //Get Products
    async getProducts(productSearchInput: ProductSearchInput) {

    };

    //Get Product
    async getProduct(id: string) {
        const product = await this.productRepository.findOne({
            where: {
                id
            },
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
        });
        if (!product) throw new NotFoundException("Product not found!");
        return product;
    };

    //Get Selling product
    async getSelling(id: string) {
        const product = await this.productRepository.findOne({
            where: {
                id
            },
            relations: {
                main_category: true
            }
        });
        if (!product) throw new NotFoundException("Product not found!");
        const products = await this.productRepository.find({
            where: {
                main_category: { id: product.main_category.id },
                is_hide: false,
                is_approved: true,
                visibility: true,
                id: Not(product.id)
            },
            take: 10
        })
        return products;
    };

    //Get Flash Product
    async getFlashProduct(flashId: string, searchInput: SearchInput) {
        const products = await this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.seller", "seller")
            .leftJoinAndSelect("product.main_category", "main_category")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.sub_category", "sub_category")
            .leftJoinAndSelect("product.brand", "brand")
            .leftJoinAndSelect("product.tag", "tag")
            .leftJoinAndSelect("product.flash", "flash")
            .leftJoinAndSelect("product.attributes", "attributes")
            .leftJoinAndSelect("product.meta", "meta")
            .orderBy("product.created_at", searchInput.orderBy ?? "DESC")
            .andWhere("product.flash.id = :flashId", { flashId: flashId })

        if (searchInput.search) {
            products.where("LOWER(product.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Product>(products, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Get No Flash Product
    async getNoFlashProduct(sellerId: string, searchInput: SearchInput) {
        const products = await this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.seller", "seller")
            .leftJoinAndSelect("product.main_category", "main_category")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.sub_category", "sub_category")
            .leftJoinAndSelect("product.brand", "brand")
            .leftJoinAndSelect("product.tag", "tag")
            .leftJoinAndSelect("product.flash", "flash")
            .leftJoinAndSelect("product.attributes", "attributes")
            .leftJoinAndSelect("product.meta", "meta")
            .orderBy("product.created_at", searchInput.orderBy ?? "DESC")
            .andWhere("product.flash IS NULL")
            .andWhere("product.seller.id = :sellerId", { sellerId: sellerId })

        if (searchInput.search) {
            products.where("LOWER(product.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Product>(products, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get Unapproved products
    async getUnapproved(searchInput: SearchInput) {
        const products = await this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.seller", "seller")
            .leftJoinAndSelect("product.main_category", "main_category")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.sub_category", "sub_category")
            .leftJoinAndSelect("product.brand", "brand")
            .leftJoinAndSelect("product.tag", "tag")
            .leftJoinAndSelect("product.flash", "flash")
            .leftJoinAndSelect("product.attributes", "attributes")
            .leftJoinAndSelect("product.meta", "meta")
            .orderBy("product.created_at", searchInput.orderBy ?? "DESC")
            .andWhere("product.is_approved = :approved", { approved: false })

        if (searchInput.search) {
            products.where("LOWER(product.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Product>(products, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get seller product
    async sellerProduct(searchInput: SearchInput, id: string) {
        const products = await this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.seller", "seller")
            .leftJoinAndSelect("product.main_category", "main_category")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.sub_category", "sub_category")
            .leftJoinAndSelect("product.brand", "brand")
            .leftJoinAndSelect("product.tag", "tag")
            .leftJoinAndSelect("product.flash", "flash")
            .leftJoinAndSelect("product.attributes", "attributes")
            .leftJoinAndSelect("product.meta", "meta")
            .orderBy("product.created_at", searchInput.orderBy ?? "DESC")
            .andWhere("product.seller.id = :sellerId", { sellerId: id })

        if (searchInput.search) {
            products.where("LOWER(product.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Product>(products, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get Seller own Products
    async getOwnSellerProducts(reqUser: ReqUser, searchInput: SearchInput) {
        const seller = await this.sellerRepository.findOneBy({
            user: { id: reqUser.id }
        });
        const products = await this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.seller", "seller")
            .leftJoinAndSelect("product.main_category", "main_category")
            .leftJoinAndSelect("product.category", "category")
            .leftJoinAndSelect("product.sub_category", "sub_category")
            .leftJoinAndSelect("product.brand", "brand")
            .leftJoinAndSelect("product.tag", "tag")
            .leftJoinAndSelect("product.flash", "flash")
            .leftJoinAndSelect("product.attributes", "attributes")
            .leftJoinAndSelect("product.meta", "meta")
            .orderBy("product.created_at", searchInput.orderBy ?? "DESC")
            .andWhere("product.seller.id = :sellerId", { sellerId: seller.id })

        if (searchInput.search) {
            products.where("LOWER(product.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Product>(products, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get own single products for seller
    async getOwnSingle(id: string, reqUser: ReqUser) {
        const seller = await this.sellerRepository.findOneBy({
            user: { id: reqUser.id }
        });
        const product = await this.productRepository.findOne({
            where: {
                id: id,
                seller: seller
            },
            relations: {
                seller: true,
                main_category: true,
                category: true,
                sub_category: true,
                brand: true,
                tag: true,
                flash: true,
                attributes: true,
                meta: true
            }
        });
        if (!product) throw new NotFoundException("Product not found!");
        return product;
    }

    //Add Products
    async add(productInput: ProductInput, reqUser: ReqUser) {
        const seller = await this.sellerRepository.findOneBy({
            user: { id: reqUser.id }
        });
        if (!seller) throw new NotFoundException("Unauthorized request!");
        let totalPrice: number;
        if (productInput.discountUnit === "percent") {
            totalPrice = Math.round(Number(productInput.price) - (Number(productInput.price) * (Number(productInput.discount) / 100)));
        } else if (productInput.discountUnit === "flat") {
            totalPrice = Math.round(Number(productInput.price) - Number(productInput.discount));
        };
        let attributes = null;
        if (productInput.attributes) {
            const attributedIds = await this.attributeRepository.find({
                where: {
                    id: In(productInput?.attributes?.attributeIds || [])
                }
            });
            attributes = this.productAttrRepository.create({
                attributeIds: attributedIds,
                selectedVariant: productInput.attributes.selectedVariant,
                attributes: productInput.attributes.attributes
            });
            await this.productAttrRepository.save(attributes);
        }
        let meta = null;
        if (productInput.meta) {
            meta = this.metaRepository.create({
                ...productInput.meta
            });
            await this.metaRepository.save(meta);
        }
        let subCategories = null;
        if (productInput.sub_category) {
            subCategories = await this.subRepository.find({
                where: {
                    id: In(productInput.sub_category)
                }
            });
        };
        let tag = null;
        if (productInput.tag) {
            tag = await this.tagRepository.find({
                where: {
                    id: In(productInput.tag)
                }
            });
        }
        const newProduct = this.productRepository.create({
            ...productInput,
            seller: seller,
            main_category: { id: productInput.main_category },
            category: { id: productInput.category },
            sub_category: subCategories,
            brand: { id: productInput.brand },
            tag,
            flash: { id: productInput.flash },
            attributes,
            meta,
            totalPrice: totalPrice.toString()
        });
        await this.productRepository.save(newProduct);
        return {
            success: true,
            message: "Product added successfully!"
        }
    }

    //Update Products
    async update(id: string, productInput: ProductInput, reqUser: ReqUser) {
        const seller = await this.sellerRepository.findOneBy({
            user: { id: reqUser.id }
        });
        const product = await this.productRepository.findOne({
            where: {
                id,
                seller: { id: seller.id }
            },
            relations: {
                sub_category: true,
                tag: true,
                meta: true,
                attributes: true
            }
        });
        if (!product) throw new NotFoundException("Product not found!");
        let totalPrice: number;
        if (productInput.discountUnit === "percent") {
            totalPrice = Math.round(Number(productInput.price) - (Number(productInput.price) * (Number(productInput.discount) / 100)));
        } else if (productInput.discountUnit === "flat") {
            totalPrice = Math.round(Number(productInput.price) - Number(productInput.discount));
        }
        if (productInput.sub_category) {
            const subCategories = await this.subRepository.find({
                where: {
                    id: In(productInput.sub_category)
                }
            });
            product.sub_category = subCategories;
        }
        if (productInput.category) {
            const tag = await this.tagRepository.find({
                where: {
                    id: In(productInput.tag)
                }
            });
            product.tag = tag;
        }
        await this.productRepository.save(product);
        let updateAttribute = null
        if (productInput.attributes) {
            if (product.attributes) {
                const attributedIds = await this.attributeRepository.find({
                    where: {
                        id: In(productInput.attributes.attributeIds)
                    }
                });
                const productAttr = await this.productAttrRepository.findOne({
                    where: {
                        id: product.attributes.id
                    },
                    relations: {
                        attributeIds: true
                    }
                });
                productAttr.attributeIds = attributedIds;
                await this.productAttrRepository.save(productAttr);
                await this.productAttrRepository.update(product.attributes.id, {
                    selectedVariant: productInput.attributes.selectedVariant,
                    attributes: productInput.attributes.attributes
                });
            } else {
                const attributedIds = await this.attributeRepository.find({
                    where: {
                        id: In(productInput?.attributes?.attributeIds || [])
                    }
                });
                updateAttribute = this.productAttrRepository.create({
                    attributeIds: attributedIds,
                    selectedVariant: productInput.attributes.selectedVariant,
                    attributes: productInput.attributes.attributes
                });
                await this.productAttrRepository.save(updateAttribute);
            }
        };
        let updateMeta = null;
        if (productInput.meta) {
            if (product.meta) {
                await this.metaRepository.update(product.meta.id, {
                    ...productInput.meta
                });
            } else {
                updateMeta = this.metaRepository.create({
                    ...productInput.meta
                });
                await this.metaRepository.save(updateMeta);
            }
        };
        const { sub_category, tag, attributes, meta, ...rest } = productInput;
        await this.productRepository.update(id, {
            ...rest,
            seller: seller,
            main_category: { id: productInput.main_category },
            category: { id: productInput.category },
            brand: { id: productInput.brand },
            flash: { id: productInput.flash },
            ...(updateMeta && { meta: updateMeta }),
            ...(updateAttribute && { attributes: updateAttribute }),
            totalPrice: totalPrice.toString()
        });
        return {
            success: true,
            message: "Product updated successfully!"
        }
    };

    //Update flash products
    async updateFlash(updateFlashProductInput: UpdateFlashProductInput, reqUser: ReqUser) {
        const flash = await this.flashRepository.findOne({
            where: {
                id: updateFlashProductInput.flashId
            }
        });
        const productIds = updateFlashProductInput.productIds;
        const seller = await this.sellerRepository.findOneBy({
            user: { id: reqUser.id }
        });
        for (let key in productIds) {
            const product = await this.productRepository.findOne({
                where: {
                    id: productIds[key],
                    seller: { id: seller.id }
                }
            });
            if (!product) throw new NotFoundException("Products not found!");
            let totalPrice: number;
            if (flash.discountUnit === "percent") {
                totalPrice = Math.round(Number(product.price) - (Number(product.price) * (Number(flash.discount) / 100)));
            } else if (flash.discountUnit === "flat") {
                totalPrice = Math.round(Number(product.price) - Number(flash.discount));
            }
            await this.productRepository.update(product.id, {
                discount: flash.discount,
                discountUnit: flash.discountUnit,
                totalPrice: totalPrice.toString(),
                flash: { id: flash.id }
            })
        }
        return {
            success: true,
            message: "Flash product updated successfully!"
        }
    };

    //Change Product Visibility
    async change(id: string, visibility: boolean) {
        const result = await this.productRepository.update(id, { visibility });
        if (result.affected === 0) throw new NotFoundException("Product not found!");
        return {
            success: true,
            message: "Product visibility change successfully!"
        }
    };

    //Approved products
    async approved(id: string, approved: boolean) {
        const result = await this.productRepository.update(id, { is_approved: approved })
        if (result.affected === 0) throw new NotFoundException("Product not found!");
        return {
            success: true,
            message: "Product approved successfully!"
        }
    };

    //Delete Product
    async delete(id: string, reqUser: ReqUser) {
        const seller = await this.sellerRepository.findOneBy({
            user: { id: reqUser.id }
        })
        const result = await this.productRepository.softDelete({
            id,
            seller: { id: seller.id }
        });
        if (result.affected === 0) throw new NotFoundException("Products not found!");
        return {
            success: true,
            message: "Product deleted successfully!"
        }
    };
}