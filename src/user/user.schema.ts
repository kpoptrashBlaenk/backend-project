import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { type Role } from '../types'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop()
  _id: Types.ObjectId

  @Prop()
  name: string

  @Prop()
  email: string

  @Prop()
  password: string

  @Prop()
  role: Role
}

export const UserSchema = SchemaFactory.createForClass(User)
