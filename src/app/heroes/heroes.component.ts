// luokkaosa, sovelluslogiikka, TypeScript

import { Component } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  // TS-piirre: oma tietotyyppi
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };
}
