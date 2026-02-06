import { createZodDto } from 'nestjs-zod'
import z from 'zod'

// schema to respect when logging in a user
const signInDtoSchema = z.object({
  email: z.email(),
  password: z.string(),
})

export class SignInBodyDto extends createZodDto(signInDtoSchema) {}
