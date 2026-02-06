import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { LoggerModule } from 'nestjs-pino'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { EnvironmentConfig, validate } from './config/env'
import { HttpExceptionFilter } from './filters/http.exception.filter'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    LoggerModule.forRoot(), // better logs (guessed)
    ConfigModule.forRoot({ validate }), // env validation
    // add mongo
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentConfig, true>) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UserModule, // add all used modules
    AuthModule, // add all used modules
    TaskModule, // add all used modules
  ],
  controllers: [AppController], // add app controller
  providers: [
    AppService, // add app service
    // add zod validation
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    // intercept zod errors (guessed)
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    // i think goes with the interceptor from zod to treat the errors? (guessed)
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
