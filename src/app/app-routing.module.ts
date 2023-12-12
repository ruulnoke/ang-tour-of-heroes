// Reititin, oma moduulinsa appin juuressa

import { NgModule } from '@angular/core';
// RouterModule ja Routes mahdollistavat reitittämisen
import { RouterModule, Routes } from '@angular/router';

// importataan paikat, joihin reitittimen halutaan vievän
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// path: merkkijono, joka vastaa URLia selaimen osoitepalkissa
// component: komponentti, joka reititittimen tulisi luoda kun mennään tähän osoitteeseen
const routes: Routes = [
  // oletusreitti: kun sovellus avataan, se näyttää Dashboardin
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
