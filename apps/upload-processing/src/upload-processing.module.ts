import { Module } from '@nestjs/common';
import { UploadProcessingService } from './upload-processing.service';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './entity/vehicle.entity';

@Module({
  imports: [
     // Redis Queue Configuration
     BullModule.forRoot({
      redis:{
        host:'127.0.0.1',        
        port:6379,
      },
    }),
    BullModule.registerQueue({
      name: 'file-upload-queue', // Queue name for file uploads
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
    TypeOrmModule.forFeature([VehicleEntity]),
  ],
  controllers: [],
  providers: [UploadProcessingService],
})
export class UploadProcessingModule {}
