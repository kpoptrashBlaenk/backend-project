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
  Query,
  Request,
} from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger'
import { ZodSerializerDto, ZodValidationPipe } from 'nestjs-zod'
import { JwtPayload } from '../types'
import { CreateTaskBodyDto } from './dtos/request/create-task.dto'
import { DeleteTaskParamsDto } from './dtos/request/delete-task.dto'
import { QueryTaskDto, queryTaskDtoSchema } from './dtos/request/query-task.dto'
import {
  UpdateTaskBodyDto,
  UpdateTaskParamsDto,
} from './dtos/request/update-task.dto'
import {
  TaskResponseDto,
  TasksResponseDto,
} from './dtos/response/task.response.dto'
import { TaskService } from './task.service'

// holds all task related routes
@Controller('task') // http://localhost:3000/task/
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth() // ask access token (swagger)
  @Get() // GET http://localhost:3000/task/
  @HttpCode(HttpStatus.OK) // 200
  @ZodSerializerDto(TasksResponseDto) // return schema
  @ApiCreatedResponse({ type: TasksResponseDto }) // return schema (swagger)
  // get all tasks
  getAll(
    // add user to request
    @Request() req: { user: JwtPayload },
    // add page, limit and status as query (all optional)
    @Query(new ZodValidationPipe(queryTaskDtoSchema)) query: QueryTaskDto,
  ) {
    return this.taskService.find(req.user.sub, query)
  }

  @ApiBearerAuth() // ask access token (swagger)
  @Get(':id') // GET http://localhost:3000/task/:id
  @HttpCode(HttpStatus.OK) // 200
  @ZodSerializerDto(TaskResponseDto) // return schema
  @ApiCreatedResponse({ type: TaskResponseDto }) // return schema (swagger)
  // get a certain task
  get(
    // id to pass
    @Param() updateTaskParamsDto: UpdateTaskParamsDto,
    // add user to request
    @Request() req: { user: JwtPayload },
  ) {
    return this.taskService.findOne(updateTaskParamsDto.id, req.user.sub)
  }

  @ApiBearerAuth() // ask access token (swagger)
  @Post() // POST http://localhost:3000/task/
  @HttpCode(HttpStatus.CREATED) // 201
  @ZodSerializerDto(TaskResponseDto) // return schema
  @ApiCreatedResponse({ type: TaskResponseDto }) // return schema (swagger)
  // create a new task
  create(
    @Body() createTaskBodyDto: CreateTaskBodyDto,
    // add user to request
    @Request() req: { user: JwtPayload },
  ) {
    return this.taskService.create(createTaskBodyDto, req.user.sub)
  }

  @ApiBearerAuth() // ask access token (swagger)
  @Put(':id') // PUT http://localhost:3000/task/:id
  @HttpCode(HttpStatus.OK) // 200
  @ZodSerializerDto(TaskResponseDto) // return schema
  @ApiCreatedResponse({ type: TaskResponseDto }) // return schema (swagger)
  // update this task
  update(
    @Body() updateTaskBodyDto: UpdateTaskBodyDto,
    // id to pass
    @Param() updateTaskParamsDto: UpdateTaskParamsDto,
    // add user to request
    @Request() req: { user: JwtPayload },
  ) {
    return this.taskService.update(
      updateTaskParamsDto.id,
      updateTaskBodyDto,
      req.user.sub,
    )
  }

  @ApiBearerAuth() // ask access token (swagger)
  @Delete(':id') // DELETE http://localhost:3000/task/:id
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  // delete this task
  delete(
    // id to pass
    @Param() params: DeleteTaskParamsDto,
    // add user to request
    @Request() req: { user: JwtPayload },
  ) {
    return this.taskService.delete(params.id, req.user.sub)
  }
}
