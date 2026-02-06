import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from './decorators/public.decorator'

// holds all app related routes
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public() // accessible to all users
  @Get('status') // http://localhost:3000/status/
  // return hello
  status(): string {
    return this.appService.getHello()
  }
}
