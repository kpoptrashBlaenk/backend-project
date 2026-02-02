import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { ZodSerializerDto } from 'nestjs-zod'
import { Public } from '../decorators/public.decorator'
import { UserResponseDto } from '../user/dtos/response/user.response.dto'
import { AuthService } from './auth.service'
import { RegisterBodyDto } from './dtos/request/register.dto'
import { SignInBodyDto } from './dtos/request/sign-in.dto'
import { AccessTokenResponseDto } from './dtos/response/access_token.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login') // POST http://localhost:3000/auth/login
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(AccessTokenResponseDto)
  @ApiCreatedResponse({ type: AccessTokenResponseDto })
  signIn(@Body() signInBodyDto: SignInBodyDto) {
    return this.authService.signIn(signInBodyDto.name, signInBodyDto.password)
  }

  @Public()
  @Post('register') // POST http://localhost:3000/auth/register
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(UserResponseDto)
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() body: RegisterBodyDto) {
    return this.authService.register(body.name, body.email, body.password)
  }
}
