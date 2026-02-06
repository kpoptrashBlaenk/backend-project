import { SetMetadata } from '@nestjs/common'

export const PUBLIC_KEY = 'PUBLIC'
// create public decorator, it doesn't actually use any params
export const Public = (...args: string[]) => SetMetadata(PUBLIC_KEY, args)
