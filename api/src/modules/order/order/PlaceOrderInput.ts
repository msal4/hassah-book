import { InputType, Field } from "type-graphql";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

import { PurchasePartialInput } from "@api/modules/purchase/purchase/PurchasePartialInput";

@InputType()
export class PlaceOrderInput {
  @Field()
  @IsNotEmpty()
  address: string;

  @Field({ nullable: true })
  @IsPhoneNumber("IQ")
  phone?: string;

  @Field(() => [PurchasePartialInput])
  purchases: PurchasePartialInput[];
}
