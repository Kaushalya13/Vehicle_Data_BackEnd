import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";

import { Queue } from "bull";
import { CreateFileUploadInput } from "../dto/create-file-upload.input";

@Injectable()
export class FileUploadService{
    constructor(
        @InjectQueue('file-upload-queue') private readonly fileUploadQueue: Queue
      ) {}

      async addJob(data:any): Promise<void>{
        // create a new upload and add the queue
        await this.fileUploadQueue.add('read-file',data);
    
      }
      create(createUploadInput: CreateFileUploadInput) {
        return 'File Upload and job add the queue';
      }
    
}