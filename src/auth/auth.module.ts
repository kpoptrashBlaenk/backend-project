import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { EnvironmentConfig } from '../config/env'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthGuard } from './guards/auth.guard'
import { RolesGuard } from './guards/roles.guard'

@Module({
  imports: [
    // include user module as user is used in auth service
    UserModule,
    // add jwt with configs for auth tokens
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentConfig, true>) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  // add auth controller
  controllers: [AuthController],
  // add auth service and all guards
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AuthModule {}
