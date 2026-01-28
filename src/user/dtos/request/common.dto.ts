import z from 'zod';
import { Types } from 'mongoose';

export const userIdSchema = z
  .string()
  .transform((val) => new Types.ObjectId(val));
