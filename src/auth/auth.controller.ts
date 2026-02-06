import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { ZodSerializerDto } from 'nestjs-zod'
import { Public } from '../decorators/public.decorator'
import { UserResponseDto } from '../user/dtos/response/user.response.dto'
import { AuthService } from './auth.service'
import { RegisterBodyDto } from './dtos/request/register.dto'
import { SignInBodyDto } from './dtos/request/sign-in.dto'
import { AccessTokenResponseDto } from './dtos/response/access_token.dto'

// holds all auth related routes
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() // accessible by all
  @Post('login') // POST http://localhost:3000/auth/login
  @HttpCode(HttpStatus.OK) // 200
  @ZodSerializerDto(AccessTokenResponseDto) // return schema
  @ApiCreatedResponse({ type: AccessTokenResponseDto }) // return schema (swagger)
  // use sign in of auth service
  signIn(@Body() signInBodyDto: SignInBodyDto) {
    return this.authService.signIn(signInBodyDto.email, signInBodyDto.password)
  }

  @Public() // accessible by all
  @Post('register') // POST http://localhost:3000/auth/register
  @HttpCode(HttpStatus.CREATED) // 201
  @ZodSerializerDto(UserResponseDto) // return schema
  @ApiCreatedResponse({ type: UserResponseDto }) // return schema (swagger)
  // use register of auth service
  create(@Body() body: RegisterBodyDto) {
    return this.authService.register(body.name, body.email, body.password)
  }
}
