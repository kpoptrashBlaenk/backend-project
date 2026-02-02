import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop()
  _id: Types.ObjectId

  @Prop()
  name: string

  @Prop()
  age: number

  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
