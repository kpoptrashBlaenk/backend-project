import { ROLES } from '../constants/roles'

export type AccessToken = { access_token: string }

export type JwtPayload = {
  sub: string
  name: string
}

export type Role = (typeof ROLES)[keyof typeof ROLES]
