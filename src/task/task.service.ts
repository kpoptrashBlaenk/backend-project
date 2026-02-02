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

  async find(ownerId: Types.ObjectId): Promise<Task[]> {
    const foundTasks = await this.taskModel.find({ owner: ownerId })

    return foundTasks
  }

  async findOne(id: Types.ObjectId, ownerId: Types.ObjectId): Promise<Task> {
    const foundTask = await this.findByIdAndCheckOwner(id, ownerId)

    return foundTask
  }

  async create(
    createTaskBodyDto: CreateTaskBodyDto,
    ownerId: Types.ObjectId,
  ): Promise<Task> {
    return this.taskModel.create({ ...createTaskBodyDto, owner: ownerId })
  }

  async update(
    id: Types.ObjectId,
    updateTaskBodyDto: UpdateTaskBodyDto,
    ownerId: Types.ObjectId,
  ): Promise<Task> {
    await this.findByIdAndCheckOwner(id, ownerId)

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

  async delete(id: Types.ObjectId, ownerId: Types.ObjectId) {
    await this.findByIdAndCheckOwner(id, ownerId)

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
