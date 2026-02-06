import { Injectable } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class BaseGuard {
  constructor() {}

  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
