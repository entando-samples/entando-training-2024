import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  constructor() {}


  getKeyCloakToken() {
    console.log(window.entando.keycloak)
    if (window.entando 
        && window.entando.keycloak 
        && window.entando.keycloak.token 
        && window.entando.keycloak.authenticated) {
      return window.entando.keycloak.token;
    }
    return '';
  }


  getDefaultOptions() {
    const token = this.getKeyCloakToken();
    console.log(token)
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    }
}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const options = this.getDefaultOptions();

        req = req.clone({
            setHeaders: options,
        })

        return next.handle(req);
    }
}