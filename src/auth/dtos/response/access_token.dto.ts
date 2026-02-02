import { createZodDto } from 'nestjs-zod'
import z from 'zod'

const accessTokenDtoSchema = z.object({
  access_token: z.string(),
})

export class AccessTokenResponseDto extends createZodDto(
  accessTokenDtoSchema,
) {}
