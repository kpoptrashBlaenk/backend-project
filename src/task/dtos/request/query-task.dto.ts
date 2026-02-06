import { createZodDto } from 'nestjs-zod'
import z from 'zod'
import { TASK_STATUS } from '../../../constants/task.constants'

/** MOTHERFUCKING SCHEMA TO RESPECT WHEN PASSING QUERIES FOR TASKS
 * AMK, STUPID ASS PAGE AND LIMIT ARE NUMBERS BUT NUMBERS CANNOT BE PROVIDED IN THE URI
 * SO INSTEAD IT HAS TO BE STRINGS THAT ARE BEING TRANSFORMED INTO NUMBERS
 * BUT OF COURSE SWAGGER DOESN'T ALLOW ME TO TYPE NUMBERS BECAUSE WE WANT STRINGS
 * EVEN WHEN TYPING IN "" IT JUST RETURNS NaN BECAUSE IT TAKES THE QUOTES AS LITERALS
 * JESUS CHRIST
 * AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
 */
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
  // also here some hardcoded task status
  status: z
    .enum([TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE])
    .optional(),
})

export class QueryTaskDto extends createZodDto(queryTaskDtoSchema) {}
