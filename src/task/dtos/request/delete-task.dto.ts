import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { taskIdSchema } from './common.dto'

// params to provide when deleting a task
export class DeleteTaskParamsDto extends createZodDto(
  z.object({ id: taskIdSchema }),
) {}
