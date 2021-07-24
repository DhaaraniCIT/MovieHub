import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Components/login/login.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { MoviesComponent } from './Components/movies/movies.component';

const routes: Routes = [

  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MoviesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
