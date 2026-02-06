import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { ROLES } from '../../../constants/roles.constants'
import { userIdSchema } from './common.dto'

const createUserDtoSchema = z.object({
  _id: userIdSchema,
  name: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[!@#$%^&*(),.?":{}|<>]/)
    .refine((val) => !/\s/.test(val)),
  role: z.enum([ROLES.ADMIN, ROLES.USER]),
})

export class CreateUserBodyDto extends createZodDto(createUserDtoSchema) {}
