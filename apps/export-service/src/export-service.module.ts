import { Module } from '@nestjs/common';
import { ExportServiceService } from './export-service.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './entity/vehicle.entity';

@Module({
  imports: [
    // GraphQL Module Configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      csrfPrevention:false, // only use dev
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'vehicledatadb',
      entities: [VehicleEntity],
      synchronize: true, // only use devloper mode

    }),
  ],
  controllers: [],
  providers: [ExportServiceService],
})
export class ExportServiceModule {}
