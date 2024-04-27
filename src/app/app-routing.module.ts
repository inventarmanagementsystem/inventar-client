import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArticlePageComponent} from "./articles/article-page/article-page.component";
import {LocationPageComponent} from "./locations/location-page/location-page.component";
import {ArticleLocationPageComponent} from "./article-locations/article-location-page/article-location-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', component: ArticlePageComponent },
  { path: 'locations', component: LocationPageComponent },
  { path: 'article-locations', component: ArticleLocationPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
