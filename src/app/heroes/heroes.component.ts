// Luokkaosa: sovelluslogiikka, TypeScript

import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  // konstruktorissa määritellään, että pyytää injektiota HeroServiceltä
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    // tilataan (subscribe) observable -> otetaan vastaan observablen välittämä tieto
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
