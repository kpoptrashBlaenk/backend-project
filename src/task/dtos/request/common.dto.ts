import z from 'zod'
import { Types } from 'mongoose'

// task id schema which is the same for every id in mongo so why isn't there a shared dto folder for id?
export const taskIdSchema = z
  .string()
  // string that is transformed into object id
  .transform((val) => new Types.ObjectId(val))
