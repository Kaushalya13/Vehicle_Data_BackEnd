import { Injectable } from '@nestjs/common';

@Injectable()
export class ExportServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
