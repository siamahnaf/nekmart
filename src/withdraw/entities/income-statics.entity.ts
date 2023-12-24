import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Income } from "./income.entities";

@ObjectType()
export class IncomeStatics {
    @Field(() => [Income], { nullable: true })
    currentIncomes: Income[];
    @Field(() => [Income], { nullable: true })
    upcomingIncomes: Income[];
    @Field(() => Date, { nullable: true })
    lastPaymentDate: Date;
}