import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
import { join } from "path";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { FileUploadService } from "./file-upload.service";
import { CreateFileUploadInput } from "../dto/create-file-upload.input";

@Resolver()
export class FileUploadResolver{
    
  constructor(
    private readonly fileuploadService: FileUploadService
  ) {}

  @Query(() => String, { name: 'healthCheck' })
  healthCheck(): String {
    return "Check Successfully";
  }
  
  @Mutation(() => String)
  async createUpload(@Args('createFileUploadInput') createFileUploadInput: CreateFileUploadInput): Promise<string> {
    return this.fileuploadService.create(createFileUploadInput);
  }

  
// file upload and save process
@Mutation(()=> String)
async uploadFile(@Args({name:'file',type:()=> GraphQLUpload}) file:FileUpload):Promise<string>{
  console.log(file.filename); 
  const { createReadStream,filename } = file;

   //  defind the directory store file 
  const uploadDir = join(process.cwd(), 'uploads');

  // check the directory exists
  if(!existsSync(uploadDir)){
    mkdirSync(uploadDir, { recursive: true });
  }

  // define the full path store the file
  const path = join(uploadDir, filename);


  // save file
  await new Promise((resolve,rejects)=>{
    createReadStream()
    .pipe(createWriteStream(path))
    .on('finish',()=>{
      resolve(filename);   // return the file name complete upload 
      console.log(`File uploaded successfully`);
    })
    .on('error', (err) => {
      console.error('Error uploading file:', err);
      rejects('Could not upload file');
    });
  })


  await this.fileuploadService.addJob({file:{path}});

  return('File uploaded and processing job added to the queue')
}
}