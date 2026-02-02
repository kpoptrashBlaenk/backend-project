import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { type TaskStatus } from '../types'

export type TaskDocument = HydratedDocument<Task>

@Schema()
export class Task {
  @Prop()
  title: string

  @Prop()
  description?: string

  @Prop()
  status: TaskStatus

  @Prop()
  owner: Types.ObjectId

  @Prop()
  dueDate?: string
}

export const TaskSchema = SchemaFactory.createForClass(Task)
