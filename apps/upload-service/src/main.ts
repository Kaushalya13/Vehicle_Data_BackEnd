import { NestFactory } from '@nestjs/core';
import { UploadServiceModule } from './upload-service.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';


async function bootstrap() {
  const app = await NestFactory.create(UploadServiceModule);
  app.use(graphqlUploadExpress({
    maxFileSize: 10000000,
    maxFiles: 10,
  }))
  await app.listen(3002);
}
bootstrap();
