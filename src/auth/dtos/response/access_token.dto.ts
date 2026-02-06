import { createZodDto } from 'nestjs-zod'
import z from 'zod'

// access token returned on login
const accessTokenDtoSchema = z.object({
  access_token: z.string(),
})

export class AccessTokenResponseDto extends createZodDto(
  accessTokenDtoSchema,
) {}
