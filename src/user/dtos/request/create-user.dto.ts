import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { ROLES } from '../../../constants/roles.constants'
import { userIdSchema } from './common.dto'

// schema to respect when creating a user
const createUserDtoSchema = z.object({
  _id: userIdSchema,
  name: z.string(),
  email: z.email(),
  /**
   * my go to password validator
   *
   * min 8 characters
   * max 128 characters
   * at least one uppercase
   * at lest one lowercase
   * at least one special character
   */
  password: z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[!@#$%^&*(),.?":{}|<>]/)
    .refine((val) => !/\s/.test(val)),
  // hardcoded roles (not present in register as this is not chosen by the user himself)
  role: z.enum([ROLES.ADMIN, ROLES.USER]),
})

export class CreateUserBodyDto extends createZodDto(createUserDtoSchema) {}
