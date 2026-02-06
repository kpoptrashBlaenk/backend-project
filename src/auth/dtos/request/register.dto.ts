import { createZodDto } from 'nestjs-zod'
import z from 'zod'

// schema to respect when registering
const registerDtoSchema = z.object({
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
})

export class RegisterBodyDto extends createZodDto(registerDtoSchema) {}
