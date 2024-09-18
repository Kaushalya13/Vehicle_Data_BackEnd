import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entity/vehicle.entity';
import { VehicleService } from './vehicle.service';
import { VehicleResolver } from './vehicle.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
  ],
  providers: [VehicleService, VehicleResolver],
  exports: [VehicleService],  
})
export class VehicleModule {}
