import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { TaskStatus } from '../types'
import { CreateTaskBodyDto } from './dtos/request/create-task.dto'
import { QueryTaskDto } from './dtos/request/query-task.dto'
import { UpdateTaskBodyDto } from './dtos/request/update-task.dto'
import { Task } from './task.schema'

// all task related route treatment
@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  // get all tasks with filters found in query
  async find(ownerId: Types.ObjectId, query: QueryTaskDto): Promise<Task[]> {
    // set page and limit defaults if not in query
    const { page = 1, limit = 100, status } = query

    // get all tasks
    const foundTasks = await this.taskModel
      // filter by current user and status if status provided
      .find({ owner: ownerId, ...(status && { status }) })
      // first record offset
      .skip((page - 1) * limit)
      // limit
      .limit(limit)

    // return tasks
    return foundTasks
  }

  // get a certain task
  async findOne(id: Types.ObjectId, ownerId: Types.ObjectId): Promise<Task> {
    // find task and check if owner is current user
    const foundTask = await this.findByIdAndCheckOwner(id, ownerId)

    // return task
    return foundTask
  }

  // create task
  async create(
    createTaskBodyDto: CreateTaskBodyDto,
    ownerId: Types.ObjectId,
  ): Promise<Task> {
    // create task with body and set current user as owner
    const createdTask = await this.taskModel.create({
      ...createTaskBodyDto,
      owner: ownerId,
    })

    // try to log task
    this.logTask(createdTask.title, createdTask.status)

    // return created task
    return createdTask
  }

  // update task
  async update(
    id: Types.ObjectId,
    updateTaskBodyDto: UpdateTaskBodyDto,
    ownerId: Types.ObjectId,
  ): Promise<Task> {
    // find task and check if owner is current user
    await this.findByIdAndCheckOwner(id, ownerId)

    // update task
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      { ...updateTaskBodyDto },
      // if id not found then create new (kinda everyone does it but i think it's not secure)
      { new: true },
    )

    // if no task found then 404
    if (!updatedTask) {
      throw new NotFoundException()
    }

    // try to log task
    this.logTask(updatedTask.title, updatedTask.status)

    // return updated task
    return updatedTask
  }

  // delete task
  async delete(id: Types.ObjectId, ownerId: Types.ObjectId) {
    await this.findByIdAndCheckOwner(id, ownerId)

    await this.taskModel.findByIdAndDelete(id)
  }

  // find task and check if current user is owner
  private async findByIdAndCheckOwner(
    id: Types.ObjectId,
    ownerId: Types.ObjectId,
  ): Promise<Task> {
    // find task
    const task = await this.taskModel.findById(id)

    // if no task or user doesn't own task then 404
    if (!task || task.owner !== ownerId) {
      throw new NotFoundException()
    }

    // return task
    return task
  }

  // log task in console if it's done
  private logTask(name: string, status: TaskStatus) {
    // check if status is done
    if (status === 'done') {
      // create message
      const message = `TASK ${name} IS NOW DONE`
      const divider = '#'.repeat(message.length)

      // log
      console.log(`
${divider}
${message}
${divider}
        `)
    }
  }
}
