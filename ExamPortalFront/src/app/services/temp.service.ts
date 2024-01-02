import {Injectable, NgModule } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class TempService {

  //get token
  public getToken() {
    return localStorage.getItem("token_exam_portal");
  }
}