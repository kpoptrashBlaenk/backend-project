import { createZodDto } from 'nestjs-zod'
import z from 'zod'

const signInDtoSchema = z.object({
  name: z.string(),
  password: z.string().min(8),
})

export class SignInBodyDto extends createZodDto(signInDtoSchema) {}
