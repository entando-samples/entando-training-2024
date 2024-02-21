import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHero } from '../models/hero.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public url!: string; 

  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<Array<IHero>> {
    return this.http.get<Array<IHero>>(`${this.url}/api/hero`);
  }

  public addNewHero(newHero: IHero): Observable<IHero> {
    return this.http.post<IHero>(`${this.url}/api/hero`, newHero);
  }
}
