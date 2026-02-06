import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TaskController } from './task.controller'
import { Task, TaskSchema } from './task.schema'
import { TaskService } from './task.service'

@Module({
  // imply a task collection in mongo
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  // add task controller
  controllers: [TaskController],
  // add task service
  providers: [TaskService],
})
export class TaskModule {}
