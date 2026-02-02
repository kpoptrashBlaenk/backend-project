import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Types } from 'mongoose'
import { ROLES } from '../constants/roles'
import { AccessToken } from '../types'
import { User } from '../user/user.schema'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(name: string, password: string): Promise<AccessToken> {
    const foundUser = await this.userService.findOneByName(name)

    if (foundUser === null) {
      throw new NotFoundException()
    }

    if (foundUser.password !== password) {
      throw new UnauthorizedException()
    }

    return await this.createAccessToken(foundUser)
  }

  async register(name: string, email: string, password: string): Promise<User> {
    return await this.userService.create({
      _id: new Types.ObjectId(),
      name,
      email,
      password,
      role: ROLES.USER,
    })
  }

  async createAccessToken(user: User) {
    const payload = { sub: user._id, name: user.name }

    return { access_token: await this.jwtService.signAsync(payload) }
  }
}
