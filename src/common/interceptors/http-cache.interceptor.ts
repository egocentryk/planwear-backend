import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;
    const httpServer = httpAdapter.getHttpServer();

    const isGetRequest = httpServer.getRequestMethod(request) === 'GET';
    const excludePaths: string[] = [];

    if (
      !isGetRequest ||
      (isGetRequest && excludePaths.includes(httpServer.getRequestUrl))
    ) {
      return undefined;
    }

    return httpServer.getRequestUrl(request);
  }
}
