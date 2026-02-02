import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
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

  async register(
    name: string,
    password: string,
    age: number,
  ): Promise<AccessToken> {
    const newUser = await this.userService.create({ name, password, age })

    return this.createAccessToken(newUser)
  }

  async createAccessToken(user: User) {
    const payload = { sub: user._id, name: user.name }

    return { access_token: await this.jwtService.signAsync(payload) }
  }
}
