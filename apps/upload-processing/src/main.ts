import { NestFactory } from '@nestjs/core';
import { UploadProcessingModule } from './upload-processing.module';

async function bootstrap() {
  const app = await NestFactory.create(UploadProcessingModule);
  await app.listen(3001);
}
bootstrap();
