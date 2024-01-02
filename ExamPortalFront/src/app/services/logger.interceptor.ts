import { HttpInterceptorFn } from '@angular/common/http';
import { INJECTOR, Injector, inject } from '@angular/core';
import { LoginService } from './login.service';


export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  //@Inject(Injector) private readonly injector: Injector
  
  console.log("Executing logger Interceptor");
  let authReq = req;
  const token =  inject(LoginService).getToken();
  //localStorage.getItem("token_exam_portal");
  console.log("Token:" +token);
  if (token != null) {
    //if token exists then add the token as header to the http request
    authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(authReq);
};
