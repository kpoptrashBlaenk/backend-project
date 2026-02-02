import { SetMetadata } from '@nestjs/common'

export const PUBLIC_KEY = 'PUBLIC'
export const Public = (...args: string[]) => SetMetadata(PUBLIC_KEY, args)
