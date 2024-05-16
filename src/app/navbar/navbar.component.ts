import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(
    private router: Router
  ) { }

  navigateToArticles() {
    this.router.navigate(["articles"])
  }

  navigateToLocations() {
    this.router.navigate(["locations"])
  }

  navigateToArticleLocations() {
    this.router.navigate(["article-locations"])
  }

  navigateToHistory() {
    this.router.navigate(["article-location-history"])
  }

  navigateToPrintArticleLocations() {
    this.router.navigate(["print-article-locations"])
  }
}
