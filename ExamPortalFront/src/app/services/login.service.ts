
import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private http: HttpClient;
  // constructor(httpBackend:HttpBackend) {
  //   this.http = new HttpClient(httpBackend);
  //  }
  // constructor(private loginHttp:LoginHTTPService) {

  // }

  public loginStatusSubject=new Subject<boolean>();

  constructor() {

  }
  //get current user
  // public getCurrentUser<user>() {
  //   return this.loginHttp.getCurrentUser();
  // }

  //login user: set token in local storage
  public loginUser(token: string) {
    localStorage.setItem("token_exam_portal", token);
    return true;
  }

  //isLogin: whether user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token_exam_portal");
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    return true;
  }

  //logout: remove token_exam_portal from the local storage
  public logout() {
    localStorage.removeItem("token_exam_portal");
    localStorage.removeItem("user");
    this.loginStatusSubject.next(false);
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem("token_exam_portal");
  }

  //set user deatails
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get user
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }
  // get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;// returns only first role
  }
}
