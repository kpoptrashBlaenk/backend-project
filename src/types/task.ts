import { TASK_STATUS } from '../constants/taskStatus'

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]
