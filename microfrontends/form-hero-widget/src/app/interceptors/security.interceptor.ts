import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class SecurityInterceptor implements HttpInterceptor {
  
    getKeycloakToken(): string | null {
      if (window.entando?.keycloak?.authenticated) {
        return window.entando.keycloak.token;
      }
      return null;
    }
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const token = this.getKeycloakToken()
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        request = request.clone({
          setHeaders: headers,
        });
      }
  
      return next.handle(request);
    }
  }