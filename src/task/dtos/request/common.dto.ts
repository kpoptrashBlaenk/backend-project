import z from 'zod'
import { Types } from 'mongoose'

export const taskIdSchema = z
  .string()
  .transform((val) => new Types.ObjectId(val))
