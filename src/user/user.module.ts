import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './user.controller'
import { User, UserSchema } from './user.schema'
import { UserService } from './user.service'

@Module({
  // imply a user collection in mongo
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // add user controller
  controllers: [UserController],
  // add user service
  providers: [UserService],
  // export user service for auth module
  exports: [UserService],
})
export class UserModule {}
