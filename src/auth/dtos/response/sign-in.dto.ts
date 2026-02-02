import { createZodDto } from 'nestjs-zod'
import z from 'zod'

const signInDtoSchema = z.object({
  access_token: z.string(),
})

export class SignInResponseDto extends createZodDto(signInDtoSchema) {}
