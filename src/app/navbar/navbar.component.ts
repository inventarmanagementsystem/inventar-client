import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserStateService} from "../users/services/user-state.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(
    private router: Router,
    protected userState: UserStateService
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
