import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class jwtCustomGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req.headers['Token']) {
      const token = req.headers['Token'];
      const verify = this.jwtService.verify(token);

      req['user'] = {
        id: verify.userId,
      };

      return true;
    } else {
      throw new HttpException('Access Denied', HttpStatus.UNAUTHORIZED);
    }
  }
}
