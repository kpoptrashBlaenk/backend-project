import { SetMetadata } from '@nestjs/common'
import { Role } from '../types'

export const ROLES_KEY = 'ROLES'
// create roles decorator that can have an array of roles as param
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
