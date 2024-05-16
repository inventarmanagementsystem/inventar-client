import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {PrintArticleLocationService} from "../services/print-article-location.service";

@Component({
  selector: 'app-print-article-locations',
  templateUrl: './print-article-locations.component.html'
})
export class PrintArticleLocationsComponent implements OnInit {
  error: string | null = null;
  filters: { [key: string]: any } = {};
  noDataReturned: boolean = false;
  @ViewChild('dt') table?: Table;

  constructor(
    protected service: PrintArticleLocationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    console.log(this.service.getArticleLocations())
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
}
