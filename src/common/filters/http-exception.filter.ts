import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express'

@Catch(HttpException) 
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const rep = ctx.getResponse<Response>();
    const status = exception.getStatus();
    //console.info(exception);
    const exceptionRes: any = exception.getResponse();
    //console.log(exceptionRes)
    const {
      error,
      message,
    } = exceptionRes;
    
    rep.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: req.url,
      error,
      message,
    });
  }
}
