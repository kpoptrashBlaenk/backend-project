import { Injectable } from '@nestjs/common'

// all app related route treatment
@Injectable()
export class AppService {
  // return ok
  getHello(): string {
    return 'OK!'
  }
}
