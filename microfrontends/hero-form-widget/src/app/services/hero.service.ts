import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHero } from '../models/hero.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public baseUrl: string;

  constructor(private http: HttpClient) { }



  public saveHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>(`${this.baseUrl}/api/hero`, hero)
  }

}
