import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { ZodSerializerDto } from 'nestjs-zod'
import { UserResponseDto } from '../user/dtos/response/user.response.dto'
import { AuthService } from './auth.service'
import { SignInBodyDto } from './dtos/request/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') // POST http://localhost:3000/auth/login
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(UserResponseDto)
  @ApiCreatedResponse({ type: UserResponseDto })
  signIn(@Body() signInBodyDto: SignInBodyDto) {
    return this.authService.signIn(signInBodyDto.name, signInBodyDto.password)
  }
}
