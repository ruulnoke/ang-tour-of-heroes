// SERVICE: hakee datan ja välittää sen muille (komponenttien ei tule noutaa tai tallentaa dataa suoraan)
// voi jakaa tietoa eri luokkiin

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// tuodaan Observable- ja of-symbolit RxJS-kirjastosta (Reactive Extensions Library for JavaScript)
// asynkronisuus
// observable on olio, joka lähettää yhden tai useamman tiedon (tai ei tietoja lainkaan); ei tiedä kenelle
// tiedot vastaanotetaan tilaamalla (subscribe)
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

// @Injectable (kuuluu dependency injection systemiin), voidaan injektoida muihin luokkiin
// HeroServiceä on yksi, jaettu instanssi, joka injektoidaan kaikkiin sitä vaativiin luokkiin
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result*/

  // <T> voi olla mitä tahansa tyyppiä
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // GET: palautuksen tyyppi observable, jonka sisällä Hero-taulukko
  // haetaan sankarit palvelimelta (tässä tapauksessa feikkipalvelimelta)
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  // GET: haetaan sankari id:n perusteella
  // jos ei löydy, antaa virheilmoituksen
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`; // luo ko. heron urlin
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // PUT: päivitetään sankari palvelimelle
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // POST: lisätään uusi sankari palvelimelle
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // DELETE: poistetaan sankari palvelimelta
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // GET: haetaan sankari, jonka nimestä löytyy hakusana
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // jos hakusanaa ei löydy, palautetaan tyhjä Hero-taulukko
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  // Logataan HeroService-viesti MessageServicen kanssa
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
