import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { type Role } from '../types'

// add user to default mongo query response
export type UserDocument = HydratedDocument<User>

// define user as found in mongo
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
