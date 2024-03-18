import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  constructor() {}


  getKeyCloakToken() {

    if (window.entando 
        && window.entando.keycloak 
        && window.entando.keycloak.token 
        && window.entando.keycloak.token.authenticated) {
      return window.entando.keycloak.token;
    }
    return '';
  }


  getDefaultOptions() {
    const token = this.getKeyCloakToken();

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