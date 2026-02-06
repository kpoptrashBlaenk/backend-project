import { createZodDto } from 'nestjs-zod'
import { userIdSchema } from './common.dto'
import z from 'zod'

// params to provide when deleting a user
export class DeleteUserParamsDto extends createZodDto(
  z.object({ id: userIdSchema }),
) {}
