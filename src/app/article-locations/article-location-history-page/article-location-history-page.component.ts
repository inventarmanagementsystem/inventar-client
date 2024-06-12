import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmPopup} from "primeng/confirmpopup";
import {MessageService} from "primeng/api";
import {ArticleLocationStateService} from "../services/article-location-state.service";
import {CreateStockHistoryRequest} from "../models/create-stock-history-request.model";
import {Router} from "@angular/router";
import {Table} from "primeng/table";
import {LocalStorageService} from "../../utility/services/local-storage.service";

@Component({
  selector: 'app-article-location-history-page',
  templateUrl: './article-location-history-page.component.html'
})
export class ArticleLocationHistoryPageComponent implements OnInit, OnDestroy {
private subscriptions = new Subscription()
  createForm: FormGroup = new FormGroup({})
  error: string | null = null;
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;
  noDataReturned: boolean = false;
  filters: { [key: string]: any } = {};
  @ViewChild('dt') table?: Table;

  constructor(
    private messageService: MessageService,
    public state: ArticleLocationStateService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(){
    this.subscriptions.add(
      this.getStockHistory()
    )

    this.initializeForms();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private initializeForms() {
    const savedCreateForm = this.localStorageService.loadCreateStockHistoryRequest();

    this.createForm = new FormGroup(
      {
        articleCode: new FormControl(savedCreateForm.articleCode || '', [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]),
        locationCode: new FormControl(savedCreateForm.locationCode || '', [
          Validators.required,
          Validators.maxLength(128)
        ]),
        stockIn: new FormControl(savedCreateForm.stockIn || '', [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]),
        stockOut: new FormControl(savedCreateForm.stockOut || '', [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]),
        order: new FormControl(savedCreateForm.order || '', [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]),
        necessary: new FormControl(savedCreateForm.necessary || '', [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]),
        source: new FormControl(savedCreateForm.source || '', [
          Validators.required,
          Validators.maxLength(128)
        ])
      },
      { updateOn: 'change' }
    );

    this.createForm.valueChanges.subscribe(() => {
      this.localStorageService.saveCreateStockHistoryRequest(this.createForm.value);
    });
  }

  private getStockHistory(): Subscription{
    return this.state.getStockHistory()
      .subscribe({
        next:(articleLocations)=>{
          articleLocations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          this.state.setStockHistory(articleLocations)
        },
        error:(error)=>{
          this.state.setError(error)
        },
        complete:() => {
          this.state.setLoading(false)
        }
      })
  }

  copyCodeToClipboard(code: string) {
    navigator.clipboard.writeText(code)
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Code ${code} copied to clipboard` });
  }

  createStockHistory() {
    let request: CreateStockHistoryRequest = {
      date: new Date(),
      articleCode: Number(this.createForm.value.articleCode) as number,
      locationCode: this.createForm.value.locationCode as string,
      stockIn: Number(this.createForm.value.stockIn) as number,
      stockOut: Number(this.createForm.value.stockOut) as number,
      order: Number(this.createForm.value.order) as number,
      necessary: Number(this.createForm.value.necessary) as number,
      source: this.createForm.value.source as string
    };

    this.state.createStockHistory(request)

    const defaultValues: CreateStockHistoryRequest = {
      date: new Date(),
      articleCode: 0,
      locationCode: '',
      stockIn: 0,
      stockOut: 0,
      order: 0,
      necessary: 0,
      source: ''
    };

    this.localStorageService.saveCreateStockHistoryRequest(defaultValues);

    this.initializeForms()
  }

  deleteStockHistory(id: number) {
    this.state.deleteStockHistory(id)
  }

  checkNoData(event: any) {
    this.noDataReturned = event.filteredValue.length === 0;
  }

  checkLocations(code: number) {
    this.router.navigate(['/article-locations'], { queryParams: { articleCode: code } });
  }

  checkArticles(code: string) {
    this.router.navigate(['/article-locations'], { queryParams: { locationCode: code } });
  }

  checkArticleHistory(articleCode: number) {
    this.filters['articleCode'] = { value: articleCode.toString() || '' };
    if (this.table) {
      setTimeout(() => {
        this.table!.filter(this.filters['articleCode'].value, 'articleCode', 'contains');
      });
    }
  }

  checkLocationHistory(locationCode: string) {
    this.filters['locationCode'] = { value: locationCode.toString() || '' };
    if (this.table) {
      setTimeout(() => {
        this.table!.filter(this.filters['locationCode'].value, 'locationCode', 'contains');
      });
    }
  }
}
