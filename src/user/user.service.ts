import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateUserBodyDto } from './dtos/request/create-user.dto'
import { User } from './user.schema'

// all user related route treatment
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // get all users
  async find(): Promise<User[]> {
    return this.userModel.find()
  }

  // get one user with this email
  async findOneByEmail(email: string): Promise<User | null> {
    // find user by email
    const foundUser = await this.userModel.findOne({ email })

    return foundUser
  }

  // create user
  async create(createUserBodyDto: CreateUserBodyDto): Promise<User> {
    // check if email already exists
    await this.emailNameExists(createUserBodyDto.email)

    // create new user
    return this.userModel.create(createUserBodyDto)
  }

  // delete user
  async delete(id: Types.ObjectId) {
    await this.userModel.findByIdAndDelete(id)
  }

  // check if email already exists
  private async emailNameExists(
    email: string,
    id?: Types.ObjectId,
  ): Promise<void> {
    // find user by email
    const exist = await this.userModel.findOne({
      email,
      // avoid id equal to current users id in case of updates that doesn't change the email
      // i just realized this is not polished because imagien he DOES changes his email but another user has this... huh...
      ...(id && { _id: { $ne: id } }),
    })

    // if exist then 409
    if (exist) {
      throw new ConflictException()
    }
  }
}
