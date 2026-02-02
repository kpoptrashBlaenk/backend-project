import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Request,
} from '@nestjs/common'
import { ZodSerializerDto } from 'nestjs-zod'
import { JwtPayload } from '../types'
import { DeleteUserParamsDto } from './dtos/request/delete-user.dto'
import { UsersResponseDto } from './dtos/response/user.response.dto'
import { UserService } from './user.service'

@Controller('user') // http://localhost:3000/user/
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // GET http://localhost:3000/user/
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(UsersResponseDto)
  find() {
    return this.userService.find()
  }

  @Delete(':id') // DELETE http://localhost:3000/user/:id
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: DeleteUserParamsDto) {
    return this.userService.delete(params.id)
  }

  @Get('profile')
  getProfile(@Request() req: { user: JwtPayload }) {
    return req.user
  }
}
