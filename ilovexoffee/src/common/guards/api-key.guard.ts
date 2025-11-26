import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,private readonly configService: ConfigService)
   {}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get('isPublic', context.getHandler());
     if(isPublic){
      return true;
     }
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['Authorization'.toLocaleLowerCase()];
    //console.log(request.headers);
     console.log('ApiKeyGuard Called'); 
    return apiKey === this.configService.get<string>('API_KEY');;
  }
}
