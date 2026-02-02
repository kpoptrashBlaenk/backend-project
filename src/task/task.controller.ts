import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger'
import { ZodSerializerDto } from 'nestjs-zod'
import { JwtPayload } from '../types'
import { CreateTaskBodyDto } from './dtos/request/create-task.dto'
import { TaskResponseDto } from './dtos/response/task.response.dto'
import { TaskService } from './task.service'

@Controller('task') // http://localhost:3000/task/
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth()
  @Post() // POST http://localhost:3000/task/
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(TaskResponseDto)
  @ApiCreatedResponse({ type: TaskResponseDto })
  create(
    @Body() body: CreateTaskBodyDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.taskService.create(body, req.user.sub)
  }
}
