import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AccessToken } from '../types'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(name: string, password: string): Promise<AccessToken> {
    const foundUser = await this.userService.findOneByName(name)

    if (foundUser.password !== password) {
      throw new UnauthorizedException()
    }

    const payload = { sub: foundUser._id, name: foundUser.name }

    return { access_token: await this.jwtService.signAsync(payload) }
  }
}
