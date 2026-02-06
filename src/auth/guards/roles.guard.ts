import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { ROLES_KEY } from '../../decorators/roles.decorator'
import { JwtPayload, Role } from '../../types'
import { BaseGuard } from './base.guard'

/**
 * RolesGuard created to make sure only certain user roles have access
 */
@Injectable()
export class RolesGuard extends BaseGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check if route has the roles decorator
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // let pass if no roles
    if (!roles) return true

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

      // if user role has no access in this route then 403
      if (!roles.includes(payload.role)) {
        throw new ForbiddenException()
      }
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }
}
