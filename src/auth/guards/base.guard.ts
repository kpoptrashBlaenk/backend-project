import { Injectable } from '@nestjs/common'
import { Request } from 'express'

// BaseGuard created so i don't have to write twice the extractTokenFromHeader method
@Injectable()
export class BaseGuard {
  constructor() {}

  // method to extract access token from header
  protected extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
