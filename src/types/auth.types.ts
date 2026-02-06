import { Types } from 'mongoose'
import { ROLES } from '../constants/roles.constants'

export type AccessToken = { access_token: string }

export type JwtPayload = {
  sub: Types.ObjectId
  email: string
  role: Role
}

export type Role = (typeof ROLES)[keyof typeof ROLES]
