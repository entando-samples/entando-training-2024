import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHero } from '../models/hero.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  public url!: string; 

  constructor(private http: HttpClient) { }

  public addNewHero(newHero: IHero): Observable<IHero> {
    return this.http.post<IHero>(`${this.url}/api/hero`, newHero);
  }
}
