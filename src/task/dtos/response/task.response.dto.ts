import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { TASK_STATUS } from '../../../constants/taskStatus'

const taskResponseDtoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum([TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE]),
  dueDate: z.string().optional(),
})

export class TaskResponseDto extends createZodDto(taskResponseDtoSchema) {}
export class TasksResponseDto extends createZodDto(
  taskResponseDtoSchema.array(),
) {}
