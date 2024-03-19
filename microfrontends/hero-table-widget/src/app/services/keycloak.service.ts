import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private instanceSource = new BehaviorSubject(this.getKeyCloakInstance());
  instance$ = this.instanceSource.asObservable();

  constructor() {
    const refresh = () => this.instanceSource.next(this.getKeyCloakInstance());
    window.addEventListener('keycloak', refresh)
   }


  private getKeyCloakInstance() {
    return (
      (window &&
        window.entando &&
        window.entando.keycloak && {
          ...window.entando.keycloak,
          initialized: true,
        }) || { initialized: false }
    );

  }
}
