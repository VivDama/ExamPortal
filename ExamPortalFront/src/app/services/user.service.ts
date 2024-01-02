import { HttpClient} from '@angular/common/http';
import {Injectable, NgModule} from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){
    console.log("Executing User Service");
  }

  // add user
  public addUser(user:any){
    return this.http.post(`${baseUrl}/user/`,user);
  }
}
