import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const adminGuard: CanActivateFn = (route, state) => {

  if(inject(LoginService).isLoggedIn() && inject(LoginService).getUserRole()=='ADMIN'){
    console.log("Logged in as ADMIN");
    return true;
  }
  
  inject(Router).navigate(['login']);
  console.log("Logged in as NORMAL");
  return false;
};
