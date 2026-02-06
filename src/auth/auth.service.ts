import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Types } from 'mongoose'
import { ROLES } from '../constants/roles.constants'
import { AccessToken } from '../types'
import { User } from '../user/user.schema'
import { UserService } from '../user/user.service'

// all auth related route treatment
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // sign in with email and password
  async signIn(email: string, password: string): Promise<AccessToken> {
    // find user by email
    const foundUser = await this.userService.findOneByEmail(email)

    // if no user then 404
    if (foundUser === null) {
      throw new NotFoundException()
    }

    // hash and check if passwords match, if not then 404 instead of 401, as you told us to do
    if (!(await bcrypt.compare(password, foundUser.password))) {
      throw new NotFoundException()
    }

    // create and return access token
    return await this.createAccessToken(foundUser)
  }

  // register with name, email and password
  async register(name: string, email: string, password: string): Promise<User> {
    // create and return user
    return await this.userService.create({
      _id: new Types.ObjectId(),
      name,
      email,
      // hash password
      password: await this.hashPassword(password),
      // default role
      role: ROLES.USER,
    })
  }

  // create access token to return to user after login
  private async createAccessToken(user: User) {
    // save user id, email and role into token
    const payload = { sub: user._id, email: user.email, role: user.role }

    // sign and return access token
    return { access_token: await this.jwtService.signAsync(payload) }
  }

  // hash password with bcrypt
  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10)

    return hashedPassword
  }
}
