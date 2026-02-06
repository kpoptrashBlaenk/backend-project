import z from 'zod'
import { Types } from 'mongoose'

// user id schema which is the same for every id in mongo so why isn't there a shared dto folder for id?
export const userIdSchema = z
  .string()
  .transform((val) => new Types.ObjectId(val))
