// Luokkaosa: sovelluslogiikka, TypeScript

import { Component, OnInit } from '@angular/core';
// koska heroes-komponentti nyt standalone, täytyy erikseen tuoda FormsModule ja UpperCasePipe
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MessageService } from '../message.service';

@Component({
  standalone: true,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  imports: [FormsModule, NgFor, NgIf, UpperCasePipe, HeroDetailComponent],
})
export class HeroesComponent implements OnInit {
  // konstruktorissa määritellään, että pyytää injektiota HeroServiceltä ja MessageServiceltä
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}
  heroes: Hero[] = [];
  // TS-piirre: kysymysmerkki tarkoittaa valinnaista (optional property), voi olla myös undefined
  selectedHero?: Hero;

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    // tilataan (subscribe) observable -> otetaan vastaan observablen välittämä tieto
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
}
