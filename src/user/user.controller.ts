import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Request,
} from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger'
import { ZodSerializerDto } from 'nestjs-zod'
import { ROLES } from '../constants/roles.constants'
import { Roles } from '../decorators/roles.decorator'
import { TasksResponseDto } from '../task/dtos/response/task.response.dto'
import { JwtPayload } from '../types'
import { DeleteUserParamsDto } from './dtos/request/delete-user.dto'
import { UsersResponseDto } from './dtos/response/user.response.dto'
import { UserService } from './user.service'

// holds all user related routes
@Controller('user') // http://localhost:3000/user/
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth() // ask access token (swagger)
  @Roles(ROLES.ADMIN) // user needs to be admin
  @Get() // GET http://localhost:3000/user/
  @HttpCode(HttpStatus.OK) // 200
  @ZodSerializerDto(UsersResponseDto) // return schema
  @ApiCreatedResponse({ type: TasksResponseDto }) // return schema (swagger)
  // get all users
  find() {
    return this.userService.find()
  }

  @ApiBearerAuth() // ask access token (swagger)
  @Get('me') // POST http://localhost:3000/user/me
  @HttpCode(HttpStatus.OK) // 200
  @ZodSerializerDto(UsersResponseDto) // return schema
  @ApiCreatedResponse({ type: TasksResponseDto }) // return schema (swagger)
  // get current user
  getProfile(@Request() req: { user: JwtPayload }) {
    return req.user
  }

  @ApiBearerAuth() // ask access token (swagger)
  @Roles(ROLES.ADMIN) // user needs to be admin
  @Delete(':id') // DELETE http://localhost:3000/user/:id
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  // delete user
  delete(@Param() params: DeleteUserParamsDto) {
    return this.userService.delete(params.id)
  }
}
