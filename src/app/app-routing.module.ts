import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArticlePageComponent} from "./articles/article-page/article-page.component";
import {LocationPageComponent} from "./locations/location-page/location-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlePageComponent },
  { path: 'locations', component: LocationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
