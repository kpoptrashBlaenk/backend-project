import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { TASK_STATUS } from '../../../constants/task.constants'
import { taskIdSchema } from './common.dto'

// schema to respect when updating a task
const updateTaskBodyDtoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  // hardcoded task status
  status: z.enum([TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE]),
  // string that are supposed to be formatted as dates (handled by the frontend)
  dueDate: z.string().optional(),
})

export class UpdateTaskBodyDto extends createZodDto(updateTaskBodyDtoSchema) {}
// params to provide when updating a task
export class UpdateTaskParamsDto extends createZodDto(
  z.object({ id: taskIdSchema }),
) {}
