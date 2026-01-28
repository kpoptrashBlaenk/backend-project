import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { ZodSerializerDto } from 'nestjs-zod'
import { CreateUserBodyDto } from './dtos/request/create-user.dto'
import { DeleteUserParamsDto } from './dtos/request/delete-user.dto'
import {
  UpdateUserBodyDto,
  UpdateUserParamsDto,
} from './dtos/request/update-user.dto'
import {
  UserResponseDto,
  UsersResponseDto,
} from './dtos/response/user.response.dto'
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

  @Post() // POST http://localhost:3000/user/
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(UserResponseDto)
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() body: CreateUserBodyDto) {
    return this.userService.create(body)
  }

  @Put(':id') // PUT http://localhost:3000/user/:id
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(UserResponseDto)
  @ApiCreatedResponse({ type: UserResponseDto })
  update(
    @Body() updateUserBodyDto: UpdateUserBodyDto,
    @Param() updateUserParamsDto: UpdateUserParamsDto,
  ) {
    return this.userService.update(updateUserParamsDto.id, updateUserBodyDto)
  }

  @Delete(':id') // DELETE http://localhost:3000/user/:id
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: DeleteUserParamsDto) {
    return this.userService.delete(params.id)
  }
}
