import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateTaskBodyDto } from './dtos/request/create-task.dto'
import { UpdateTaskBodyDto } from './dtos/request/update-task.dto'
import { Task } from './task.schema'

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async findOne(id: Types.ObjectId, userId: Types.ObjectId): Promise<Task> {
    const foundTask = await this.findByIdAndCheckOwner(id, userId)

    return foundTask
  }

  async create(
    createTaskBodyDto: CreateTaskBodyDto,
    userId: Types.ObjectId,
  ): Promise<Task> {
    return this.taskModel.create({ ...createTaskBodyDto, owner: userId })
  }

  async update(
    id: Types.ObjectId,
    updateTaskBodyDto: UpdateTaskBodyDto,
    userId: Types.ObjectId,
  ): Promise<Task> {
    await this.findByIdAndCheckOwner(id, userId)

    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      { ...updateTaskBodyDto },
      { new: true },
    )

    if (!updatedTask) {
      throw new NotFoundException()
    }

    return updatedTask
  }

  async delete(id: Types.ObjectId, userId: Types.ObjectId) {
    await this.findByIdAndCheckOwner(id, userId)

    await this.taskModel.findByIdAndDelete(id)
  }

  private async findByIdAndCheckOwner(
    id: Types.ObjectId,
    ownerId: Types.ObjectId,
  ): Promise<Task> {
    const task = await this.taskModel.findById(id)

    if (!task || task.owner !== ownerId) {
      throw new NotFoundException()
    }

    return task
  }
}
