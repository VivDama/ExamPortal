import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  if(inject(LoginService).isLoggedIn()){
    inject(Router).navigate(['/']);
    return false;
  }
  return true;
};
