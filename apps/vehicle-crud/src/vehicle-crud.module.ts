import { Module } from '@nestjs/common';
import { VehicleCrudService } from './vehicle-crud.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle/entity/vehicle.entity';

@Module({
  imports: [
    VehicleModule,
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      autoSchemaFile:true,
      csrfPrevention:false, // only use dev
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'vehicledatadb',
      entities: [Vehicle],
      synchronize: true, // only use dev
  
    }),
  ],
  controllers: [],
  providers: [VehicleCrudService],
})
export class VehicleCrudModule {}
