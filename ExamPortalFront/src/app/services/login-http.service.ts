import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import baseUrl from "./helper";


@Injectable({
    providedIn: 'root'
})
export class LoginHTTPService {
    constructor(private http: HttpClient) {

    }

    //generate token
    public generateToken(loginData: any) {
        console.log("genrate Token start from loginhttp");
        return this.http.post(`${baseUrl}/generate-token`, loginData);

    }

    //get current user
    public getCurrentUser() {
        return this.http.get(`${baseUrl}/current-user`);
    }
}