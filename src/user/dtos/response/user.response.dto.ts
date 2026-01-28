import { createZodDto } from 'nestjs-zod'
import z from 'zod'

export const userResponseSchema = z.object({
  name: z.string(),
  age: z.number(),
})

export class UserResponseDto extends createZodDto(userResponseSchema) {}
export class UsersResponseDto extends createZodDto(
  userResponseSchema.array(),
) {}
