import {Component, OnInit} from '@angular/core';
import {PrintArticleLocationsStateService} from "./article-locations/services/print-article-locations-state.service";
import {LocalStorageService} from "./utility/services/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'inventar-client';

  constructor(
    private printArticleLocationsService: PrintArticleLocationsStateService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.printArticleLocationsService.setArticleLocations(this.localStorageService.loadPrintArticleLocations())
  }
}
