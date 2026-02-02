import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateTaskBodyDto } from './dtos/request/create-task.dto'
import { Task } from './task.schema'

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(
    createTaskBodyDto: CreateTaskBodyDto,
    userId: string,
  ): Promise<Task> {
    return this.taskModel.create({ ...createTaskBodyDto, _id: userId })
  }
}
