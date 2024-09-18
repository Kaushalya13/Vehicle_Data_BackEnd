import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateVehicleInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  carMake: string;

  @Field()
  carModel: string;  

  @Field()
  vin: string;

  @Field(()=> Date)
  manufacturedDate: Date;

  @Field()
  vehicleAge: number;
}
