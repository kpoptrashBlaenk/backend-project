import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { PUBLIC_KEY } from '../../decorators/public.decorator'
import { JwtPayload } from '../../types'
import { BaseGuard } from './base.guard'

/**
 * AuthGuard created to make sure the user has an access token
 */
@Injectable()
export class AuthGuard extends BaseGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check if route has the public decorator
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // let pass if public
    if (isPublic) return true

    // get token
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeader(request)

    // if no token then 401
    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      // get payload
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token)

      // pass payload in request as user
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }

    // let pass
    return true
  }
}
