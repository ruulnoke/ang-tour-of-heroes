// SERVICE: hakee datan ja välittää sen muille (komponenttien ei tule noutaa tai tallentaa dataa suoraan)
// voi jakaa tietoa eri luokkiin

import { Injectable } from '@angular/core';

// tuodaan Observable- ja of-symbolit RxJS-kirjastosta (Reactive Extensions Library for JavaScript)
// asynkronisuus
// observable on olio, joka lähettää yhden tai useamman tiedon (tai ei tietoja lainkaan); ei tiedä kenelle
// tiedot vastaanotetaan tilaamalla (subscribe)
import { Observable, of } from 'rxjs';

import { Hero } from './hero';

// tässä tehtävässä feikkidata; todellisessa elämässä esimerkiksi backend hakee tiedot tietokannasta ja service backendista
// service tietää mitä on HEROES, komponentit eivät - komponentit tietävät ainoastaan servicen välittävän tiedon niille
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

// @Injectable (kuuluu dependency injection systemiin), voidaan injektoida muihin luokkiin
// HeroServiceä on yksi, jaettu instanssi, joka injektoidaan kaikkiin sitä vaativiin luokkiin
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  // palautuksen tyyppi observable, jonka sisällä Hero-taulukko

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
}
