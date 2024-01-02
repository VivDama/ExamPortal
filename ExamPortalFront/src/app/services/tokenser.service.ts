import { HttpBackend, HttpClient } from "@angular/common/http";
import {Injectable, NgModule } from "@angular/core";


@NgModule({
    
})


@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private http: HttpClient;
    constructor(httpBackend: HttpBackend){
        this.http = new HttpClient(httpBackend);
    }
     //get token
  public getToken() {
    return localStorage.getItem("token_exam_portal");
  }
}