import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsEnum } from "class-validator";

@InputType()
export class RefundStatusInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsEnum(["Approved", "Cancelled"], { message: "Status can be 'Approved' and 'Cancelled'!" })
    status: string;
}