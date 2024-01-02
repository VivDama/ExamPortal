import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


@NgModule({
    providers: [LoginService],
})

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private login: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //add the jwt token
        console.log("Executing intercept method");
        
        let authReq = req;
        const token = this.login.getToken();
        if (token != null) {
            //if token exists then add the token as header to the http request
            authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = (
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi: true,
    }
);