import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { TASK_STATUS } from '../../../constants/task.constants'
import { taskIdSchema } from './common.dto'

const updateTaskBodyDtoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum([TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE]),
  dueDate: z.string().optional(),
})

export class UpdateTaskBodyDto extends createZodDto(updateTaskBodyDtoSchema) {}
export class UpdateTaskParamsDto extends createZodDto(
  z.object({ id: taskIdSchema }),
) {}
