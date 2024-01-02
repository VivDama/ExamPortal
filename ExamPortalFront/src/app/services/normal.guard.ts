import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const normalGuard: CanActivateFn = (route, state) => {
  if(inject(LoginService).isLoggedIn() && inject(LoginService).getUserRole() =='NORMAL' ){
    return true;
  }
  inject(Router).navigate(['login']);
  return false;
};
