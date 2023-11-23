// moduulit koottuna

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  declarations: [AppComponent],
  // koska HeroesComponent muutettiin standaloneksi, sitä ei enää declaroida, vaan importataan
  imports: [BrowserModule, AppRoutingModule, FormsModule, HeroesComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
