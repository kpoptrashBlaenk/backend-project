import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { taskIdSchema } from './common.dto'

export class DeleteTaskParamsDto extends createZodDto(
  z.object({ id: taskIdSchema }),
) {}
