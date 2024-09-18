import { NestFactory } from '@nestjs/core';
import { VehicleCrudModule } from './vehicle-crud.module';

async function bootstrap() {
  const app = await NestFactory.create(VehicleCrudModule);
  await app.listen(3005);
}
bootstrap();
