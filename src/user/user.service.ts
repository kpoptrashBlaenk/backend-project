import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateUserBodyDto } from './dtos/request/create-user.dto'
import { UpdateUserBodyDto } from './dtos/request/update-user.dto'
import { User } from './user.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async find(): Promise<User[]> {
    return this.userModel.find()
  }

  async findOneByName(name: string): Promise<User> {
    const foundUser = await this.userModel.findOne({ name })

    if (foundUser === null) {
      throw new NotFoundException()
    }

    return foundUser
  }

  async create(createUserBodyDto: CreateUserBodyDto): Promise<User> {
    if (await this.userNameExists(createUserBodyDto.name)) {
      throw new ConflictException()
    }
    return this.userModel.create(createUserBodyDto)
  }

  async update(
    id: Types.ObjectId,
    updateUserDto: UpdateUserBodyDto,
  ): Promise<User> {
    if (await this.userNameExists(updateUserDto.name, id)) {
      throw new ConflictException()
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      updateUserDto,
      {
        new: true,
      },
    )

    if (updatedUser === null) {
      throw new NotFoundException()
    }

    return updatedUser
  }

  async delete(id: Types.ObjectId): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete({ _id: id })

    if (deletedUser === null) {
      throw new NotFoundException()
    }

    return deletedUser
  }

  private async userNameExists(
    name: string,
    id?: Types.ObjectId,
  ): Promise<boolean> {
    const found = await this.userModel.findOne({
      name,
      ...(id && { _id: { $ne: id } }),
    })

    return found !== null
  }
}
