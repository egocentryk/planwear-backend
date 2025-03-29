import { UserRole } from '@components/user/enums/role.enum'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { ActiveUserData } from '@components/iam/interfaces/active-user-data.interface'
import { REQUEST_USER_KEY } from '@components/iam/iam.constants'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!contextRoles || contextRoles.length === 0) {
      return true
    }

    const gqlContext = GqlExecutionContext.create(context)
    const ctx = gqlContext.getContext()

    const user: ActiveUserData =
      ctx[REQUEST_USER_KEY] || (ctx.req && ctx.req[REQUEST_USER_KEY])

    if (!user) {
      return false
    }

    return contextRoles.some((role) => user.role === role)
  }
}
