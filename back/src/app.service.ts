import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  getHello(): string {
    console.log("hello world");
    return 'Hello World!';
  }
}
