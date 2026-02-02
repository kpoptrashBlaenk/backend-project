import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger'
import { ZodSerializerDto } from 'nestjs-zod'
import { JwtPayload } from '../types'
import { CreateTaskBodyDto } from './dtos/request/create-task.dto'
import { DeleteTaskParamsDto } from './dtos/request/delete-task.dto'
import {
  UpdateTaskBodyDto,
  UpdateTaskParamsDto,
} from './dtos/request/update-task.dto'
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
    @Body() createTaskBodyDto: CreateTaskBodyDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.taskService.create(createTaskBodyDto, req.user.sub)
  }

  @ApiBearerAuth()
  @Put(':id') // PUT http://localhost:3000/task/:id
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(TaskResponseDto)
  @ApiCreatedResponse({ type: TaskResponseDto })
  update(
    @Body() updateTaskBodyDto: UpdateTaskBodyDto,
    @Param() updateTaskParamsDto: UpdateTaskParamsDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.taskService.update(
      updateTaskParamsDto.id,
      updateTaskBodyDto,
      req.user.sub,
    )
  }

  @ApiBearerAuth()
  @Delete(':id') // DELETE http://localhost:3000/task/:id
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param() params: DeleteTaskParamsDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.taskService.delete(params.id, req.user.sub)
  }
}
