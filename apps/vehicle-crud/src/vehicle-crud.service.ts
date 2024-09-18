import { Injectable } from '@nestjs/common';

@Injectable()
export class VehicleCrudService {
  getHello(): string {
    return 'Hello World!';
  }
}
