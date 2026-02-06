import { Types } from 'mongoose'
import { ROLES } from '../constants/roles.constants'

// access token
export type AccessToken = { access_token: string }

// access token payload
export type JwtPayload = {
  sub: Types.ObjectId
  email: string
  role: Role
}

// existing roles
export type Role = (typeof ROLES)[keyof typeof ROLES]
