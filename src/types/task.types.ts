import { TASK_STATUS } from '../constants/task.constants'

// existing tasks
export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]
