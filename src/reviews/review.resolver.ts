import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Service
import { ReviewService } from "./review.service";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Review, GetReviews } from "./entities/reviews.entity";

//Dto
import { ReviewInput } from "./dto/review.dto";
import { CheckReviewInput } from "./dto/check.dto";
import { ReplyInput } from "./dto/reply.dto";
import { SearchInput } from "@/user/dto/search.dto";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

//Types
import { ReqUser } from "@/auth/entities/user.types";


@Resolver(Review)
export class ReviewResolver {
    //Constructor
    constructor(
        private readonly reviewService: ReviewService
    ) { };

    //Get reviews by product
    @Query(() => [Review], { name: "getReviewByProduct" })
    getReviews(
        @Args("productId", { type: () => String }) productId: string
    ) {
        return this.reviewService.getReviews(productId);
    };

    //Get reviews by admin
    @Query(() => GetReviews, { name: "getReviewByAdmin" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getReviewsByAdmin(
        @Args("searchInput") searchInput: SearchInput
    ) {
        return this.reviewService.getReviewsByAdmin(searchInput);
    };

    //Get reviews by seller
    @Query(() => GetReviews, { name: "getReviewBySeller" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getReviewBySeller(
        @Args("searchInput") searchInput: SearchInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.reviewService.getReviewBySeller(reqUser, searchInput);
    }

    // Check review is available
    @Query(() => SuccessInfo, { name: "reviewAvailability" })
    @UseGuards(AuthGuard)
    check(
        @Args("checkReviewInput") checkReviewInput: CheckReviewInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.reviewService.check(checkReviewInput, reqUser);
    };

    //Add Reviews
    @Mutation(() => SuccessInfo, { name: "addReviews" })
    @UseGuards(AuthGuard)
    add(
        @Args("reviewInput") reviewInput: ReviewInput,
        @Context("user") reqUser: ReqUser
    ) {
        return this.reviewService.add(reviewInput, reqUser);
    };

    //Reply reviews
    @Mutation(() => SuccessInfo, { name: "replyReview" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    reply(
        @Args("replyInput") replyInput: ReplyInput
    ) {
        return this.reviewService.reply(replyInput);
    }

    //Change review visibility
    @Mutation(() => SuccessInfo, { name: "changeReviewVisibility" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard)
    visibility(
        @Args("reviewId", { type: () => String }) reviewId: string
    ) {
        return this.reviewService.visibility(reviewId);
    };
}