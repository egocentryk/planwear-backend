import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { REQUEST_USER_KEY } from '../iam.constants'
import { ActiveUserData } from '../interfaces/active-user-data.interface'

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context)
    const ctx = gqlContext.getContext()

    const request = ctx.req
    const user: ActiveUserData | undefined = request[REQUEST_USER_KEY]

    return field ? user?.[field] : user
  },
)
