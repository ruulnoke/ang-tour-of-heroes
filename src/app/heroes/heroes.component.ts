// Luokkaosa: sovelluslogiikka, TypeScript

import { Component } from '@angular/core';
// koska heroes-komponentti nyt standalone, täytyy erikseen tuoda ForsModule ja UpperCasePipe
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  standalone: true,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  imports: [FormsModule, NgFor, NgIf, UpperCasePipe],
})
export class HeroesComponent {
  heroes = HEROES;
  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
