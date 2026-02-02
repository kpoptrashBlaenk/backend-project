import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateUserBodyDto } from './dtos/request/create-user.dto'
import { User } from './user.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async find(): Promise<User[]> {
    return this.userModel.find()
  }

  async findOneByName(name: string): Promise<User | null> {
    const foundUser = await this.userModel.findOne({ name })

    return foundUser
  }

  async create(createUserBodyDto: CreateUserBodyDto): Promise<User> {
    if (await this.emailNameExists(createUserBodyDto.email)) {
      throw new ConflictException()
    }

    return this.userModel.create(createUserBodyDto)
  }

  async delete(id: Types.ObjectId) {
    await this.userModel.findByIdAndDelete(id)
  }

  private async emailNameExists(
    email: string,
    id?: Types.ObjectId,
  ): Promise<boolean> {
    const found = await this.userModel.findOne({
      email,
      ...(id && { _id: { $ne: id } }),
    })

    return found !== null
  }
}
