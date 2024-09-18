import { Module } from '@nestjs/common';
import { UploadServiceService } from './upload-service.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { FileUploadModule } from './upload/file-upload.module';

@Module({
  imports: [
    FileUploadModule,
    // GraphQL Module Configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile:true,
      csrfPrevention:false, // only use dev
    }),
  ],
  controllers: [],
  providers: [UploadServiceService],
})
export class UploadServiceModule {}
