import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserBodyDto } from './dtos/request/create-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.schema'
import { Model, Types } from 'mongoose'
import { UpdateUserBodyDto } from './dtos/request/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

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
    if (await this.userNameExists(updateUserDto.name)) {
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

  private async userNameExists(name: string): Promise<boolean> {
    const found = await this.userModel.findOne({
      name,
    })

    return found !== null
  }
}
