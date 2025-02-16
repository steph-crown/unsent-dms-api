import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const path = request.url;

    return next.handle().pipe(
      map((data) => {
        const responseFormat = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          timestamp: new Date().toISOString(),
          path,
          message: data?.message || null,
          data: data?.data || null,
          isSuccessful: data?.isSuccessful || true,
          meta: data?.meta || null,
        };

        return responseFormat;
      }),
    );
  }
}
