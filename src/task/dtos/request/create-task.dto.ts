import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { TASK_STATUS } from '../../../constants/task.constants'

// schema to respect when creating a task
const createTaskBodyDtoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  // hardcoded task status
  status: z.enum([TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE]),
  // string that are supposed to be formatted as dates (handled by the frontend)
  dueDate: z.string().optional(),
})

export class CreateTaskBodyDto extends createZodDto(createTaskBodyDtoSchema) {}
