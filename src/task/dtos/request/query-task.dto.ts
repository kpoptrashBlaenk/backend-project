import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { TASK_STATUS } from '../../../constants/task.constants'

export const queryTaskDtoSchema = z.object({
  page: z
    .preprocess((val) => {
      if (typeof val === 'string') return parseInt(val)
      if (typeof val === 'number') return val
      return 1
    }, z.number().min(1).default(1))
    .optional(),

  limit: z
    .preprocess((val) => {
      if (typeof val === 'string') return parseInt(val)
      if (typeof val === 'number') return val
      return 10
    }, z.number().min(1).default(10))
    .optional(),
  status: z
    .enum([TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE])
    .optional(),
})

export class QueryTaskDto extends createZodDto(queryTaskDtoSchema) {}
