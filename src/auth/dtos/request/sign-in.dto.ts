import { createZodDto } from 'nestjs-zod'
import z from 'zod'

const signInDtoSchema = z.object({
  email: z.email(),
  password: z.string(),
})

export class SignInBodyDto extends createZodDto(signInDtoSchema) {}
