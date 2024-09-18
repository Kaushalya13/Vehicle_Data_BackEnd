import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('vehicledata')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id:string;

  @Column()
  @Field()
  firstName:string;

  @Column()
  @Field()
  lastName:string;

  @Column()
  @Field()
  email:string

  @Column()
  @Field()
  carMake:string

  @Column()
  @Field()
  carModel:string

  @Column()
  @Field()
  vin:string

  @Column({type: 'date'})
  @Field(() => Date)
  manufacturedDate: Date;

  @Column()
  @Field(() => Int)
  vehicleAge:number;
}
