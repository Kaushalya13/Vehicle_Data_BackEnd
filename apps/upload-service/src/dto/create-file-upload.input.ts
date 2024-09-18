import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts';

@InputType()
export class CreateFileUploadInput {
  @Field(() => GraphQLUpload, { description: 'File to be uploaded' })
  file: Promise<FileUpload>;
}
