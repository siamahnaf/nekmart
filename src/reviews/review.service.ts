import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

//Orm entity
import { Review } from "./model/reviews.entity";
import { Seller } from "@/seller/model/seller.entity";

//Dto
import { ReviewInput } from "./dto/review.dto";
import { CheckReviewInput } from "./dto/check.dto";
import { ReplyInput } from "./dto/reply.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Types
import { ReqUser } from "@/auth/entities/user.types";

@Injectable()
export class ReviewService {
    //Constructor
    constructor(
        @InjectRepository(Review) private reviewRepository: Repository<Review>,
        @InjectRepository(Seller) private sellerRepository: Repository<Seller>
    ) { };

    //Get Reviews by product
    async getReviews(productId: string) {
        const reviews = await this.reviewRepository.find({
            where: {
                product: { id: productId },
                publish: true
            },
            relations: {
                seller: true,
                product: true,
                user: true
            },
            order: {
                created_at: "DESC"
            }
        })
        return reviews;
    };

    //Get Reviews by User
    async getReviewsByAdmin(searchInput: SearchInput) {
        const reviews = await this.reviewRepository
            .createQueryBuilder("review")
            .leftJoinAndSelect("review.user", "user")
            .leftJoinAndSelect("review.product", "product")
            .leftJoinAndSelect("review.seller", "seller")
            .orderBy("review.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            reviews.where("LOWER(review.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Review>(reviews, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });

        return {
            results: items,
            meta
        }
    };

    //Get seller by user
    async getReviewBySeller(reqUser: ReqUser, searchInput: SearchInput) {
        const seller = await this.sellerRepository.findOne({
            where: {
                user: { id: reqUser.id }
            }
        });
        const reviews = await this.reviewRepository
            .createQueryBuilder("review")
            .where("review.seller.id = :seller", { seller: seller.id })
            .leftJoinAndSelect("review.user", "user")
            .leftJoinAndSelect("review.product", "product")
            .leftJoinAndSelect("review.seller", "seller")
            .orderBy("review.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            reviews.where("LOWER(review.name) LIKE :search", { search: `%${searchInput.search.toLowerCase()}%` })
        }

        const { items, meta } = await paginate<Review>(reviews, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });

        return {
            results: items,
            meta
        }
    }

    //Add Reviews
    async add(reviewInput: ReviewInput, reqUser: ReqUser) {
        const reviews = await this.reviewRepository.findOne({
            where: {
                user: { id: reqUser.id },
                product: { id: reviewInput.product }
            }
        });

        if (reviews) throw new NotFoundException("You already place a review!");
        const newReview = this.reviewRepository.create({
            ...reviewInput,
            product: { id: reviewInput.product },
            seller: { id: reviewInput.seller },
            user: { id: reqUser.id }
        });
        await this.reviewRepository.save(newReview);

        await this.sellerRepository.increment({
            id: reviewInput.seller
        }, "totalReview", 1);

        await this.sellerRepository.increment({
            id: reviewInput.seller
        }, "totalRating", reviewInput.rating);

        return {
            success: true,
            message: "Review added successfully!"
        }
    };

    //Reply review
    async reply(replyInput: ReplyInput) {
        const review = await this.reviewRepository.findOneBy({
            id: replyInput.reviewId
        });
        if (!review) throw new NotFoundException("Review not found!");
        if (review.reply) throw new NotFoundException("Reply already added!")

        await this.reviewRepository.update(review.id, {
            reply: replyInput.reply
        })

        return {
            success: true,
            message: "Reply added successfully!"
        }
    }

    //Check Review is available
    async check(checkReviewInput: CheckReviewInput, reqUser: ReqUser) {
        const review = await this.reviewRepository.findOneBy({
            product: { id: checkReviewInput.product },
            user: { id: reqUser.id }
        });
        if (review) {
            return {
                success: true,
                message: "Review already added!"
            }
        } else {
            return {
                success: false,
                message: "Review not added yet!"
            }
        }
    };

    //Change Review Visibility
    async visibility(reviewId: string) {
        const review = await this.reviewRepository.findOneBy({
            id: reviewId
        });
        await this.reviewRepository.update(reviewId, {
            publish: !review.publish
        });
        return {
            success: true,
            message: `Review ${review.publish ? "unpublished" : "published"} successfully!`
        };
    }
}