import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArticlePageComponent} from "./articles/article-page/article-page.component";
import {LocationPageComponent} from "./locations/location-page/location-page.component";
import {ArticleLocationPageComponent} from "./article-locations/article-location-page/article-location-page.component";
import {
  ArticleLocationHistoryPageComponent
} from "./article-locations/article-location-history-page/article-location-history-page.component";
import {
  PrintArticleLocationsComponent
} from "./article-locations/print-article-locations/print-article-locations.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'articles', component: ArticlePageComponent },
  { path: 'locations', component: LocationPageComponent },
  { path: 'article-locations', component: ArticleLocationPageComponent },
  { path: 'article-location-history', component: ArticleLocationHistoryPageComponent },
  { path: 'print-article-locations', component: PrintArticleLocationsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
