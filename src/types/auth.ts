import { Types } from 'mongoose'
import { ROLES } from '../constants/roles'

export type AccessToken = { access_token: string }

export type JwtPayload = {
  sub: Types.ObjectId
  email: string
  role: string
}

export type Role = (typeof ROLES)[keyof typeof ROLES]
