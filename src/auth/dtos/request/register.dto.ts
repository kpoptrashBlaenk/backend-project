import { createZodDto } from 'nestjs-zod'
import z from 'zod'

const registerDtoSchema = z.object({
  name: z.string(),
  password: z.string().min(8),
  age: z.number().min(1).max(120),
})

export class RegisterBodyDto extends createZodDto(registerDtoSchema) {}
