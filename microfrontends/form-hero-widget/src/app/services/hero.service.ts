import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHero } from '../models/hero.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public baseURL: string;

  constructor(private http: HttpClient) { }

  public createHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>(`${this.baseURL}/api/hero`, hero);
  }
}
