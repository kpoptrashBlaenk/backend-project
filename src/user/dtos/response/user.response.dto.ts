import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { ROLES } from '../../../constants/roles'

export const userResponseSchema = z.object({
  name: z.string(),
  email: z.email(),
  role: z.union([z.literal(ROLES.USER), z.literal(ROLES.ADMIN)]),
})

export class UserResponseDto extends createZodDto(userResponseSchema) {}
export class UsersResponseDto extends createZodDto(
  userResponseSchema.array(),
) {}
