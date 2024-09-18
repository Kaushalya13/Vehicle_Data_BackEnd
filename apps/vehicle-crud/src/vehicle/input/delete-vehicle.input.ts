import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteVehicleInput{
    @Field()
    id: string;
}