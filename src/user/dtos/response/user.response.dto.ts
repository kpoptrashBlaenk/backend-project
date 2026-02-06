import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { ROLES } from '../../../constants/roles.constants'

// user returned
export const userResponseSchema = z.object({
  name: z.string(),
  email: z.email(),
  role: z.union([z.literal(ROLES.USER), z.literal(ROLES.ADMIN)]),
})

export class UserResponseDto extends createZodDto(userResponseSchema) {}
// user as an array
export class UsersResponseDto extends createZodDto(
  userResponseSchema.array(),
) {}
