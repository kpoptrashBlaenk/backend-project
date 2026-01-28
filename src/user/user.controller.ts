import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserBodyDto } from './dtos/request/create-user.dto';
import {
  UpdateUserBodyDto,
  UpdateUserParamsDto,
} from './dtos/request/update-user.dto';
import { DeleteUserParamsDto } from './dtos/request/delete-user.dto';
import { ZodSerializerDto } from 'nestjs-zod';
import { UserResponseDto } from './dtos/response/user.response.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user') // http://localhost:3000/user/
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post() // POST http://localhost:3000/user/
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(UserResponseDto)
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() body: CreateUserBodyDto) {
    return this.userService.create(body);
  }

  @Put(':id') // PUT http://localhost:3000/user/:id
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(UserResponseDto)
  @ApiCreatedResponse({ type: UserResponseDto })
  update(
    @Body() updateUserBodyDto: UpdateUserBodyDto,
    @Param() updateUserParamsDto: UpdateUserParamsDto,
  ) {
    return this.userService.update(updateUserParamsDto.id, updateUserBodyDto);
  }

  @Delete(':id') // DELETE http://localhost:3000/user/:id
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: DeleteUserParamsDto) {
    return this.userService.delete(params.id);
  }
}
