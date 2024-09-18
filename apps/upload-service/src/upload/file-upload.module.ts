import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { FileUploadResolver } from './file-upload.resolver';
import { FileUploadService } from './file-upload.service';

@Module({
  providers: [FileUploadResolver, FileUploadService],
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
  ],
})
export class FileUploadModule {}
