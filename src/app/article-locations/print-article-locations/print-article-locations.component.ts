import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {Subscription} from "rxjs";
import {ArticleLocation} from "../models/article-location.model";
import {PrintArticleLocationsStateService} from "../services/print-article-locations-state.service";

@Component({
  selector: 'app-print-article-locations',
  templateUrl: './print-article-locations.component.html'
})
export class PrintArticleLocationsComponent implements OnInit {
  subscriptions = new Subscription()
  error: string | null = null;
  filters: { [key: string]: any } = {};
  noDataReturned: boolean = false;
  @ViewChild('dt') table?: Table;
  articleLocations: ArticleLocation[] = []

  constructor(
    protected state: PrintArticleLocationsStateService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.state.state$.subscribe(data => {
        this.articleLocations = data.articleLocations
      })
    )
  }

  copyCodeToClipboard(code: string) {
    navigator.clipboard.writeText(code)
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Code ${code} copied to clipboard` });
  }

  checkNoData(event: any) {
    this.noDataReturned = event.filteredValue.length === 0;
  }

  checkLocations(articleCode: number) {
    this.filters['articleCode'] = { value: articleCode.toString() || '' };
    if (this.table) {
      setTimeout(() => {
        this.table!.filter(this.filters['articleCode'].value, 'articleCode', 'contains');
      });
    }
  }

  checkArticles(locationCode: string) {
    this.filters['locationCode'] = { value: locationCode.toString() || '' };
    if (this.table) {
      setTimeout(() => {
        this.table!.filter(this.filters['locationCode'].value, 'locationCode', 'contains');
      });
    }
  }

  removeFromPrint(articleLocation: ArticleLocation){
    this.state.removeArticleLocation(articleLocation.articleCode, articleLocation.locationCode)
  }

  removeAllFromPrint() {
    let count = 0
    this.articleLocations.forEach(al => {
      try {
        this.state.removeArticleLocation(al.articleCode, al.locationCode)
        count++
      }
      catch { }
    })
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Removed ${count} article locations from print` });
  }
}
