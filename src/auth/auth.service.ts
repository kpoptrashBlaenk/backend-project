import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '../user/user.schema'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(name: string, password: string): Promise<User> {
    const foundUser = await this.userService.findOneByName(name)

    if (foundUser.password !== password) {
      throw new UnauthorizedException()
    }

    return foundUser
  }
}
