import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmPopup} from "primeng/confirmpopup";
import {MessageService} from "primeng/api";
import {ArticleLocationStateService} from "../services/article-location-state.service";
import {ArticleLocation} from "../models/article-location.model";
import {UpdateArticleLocationRequest} from "../models/update-article-location-request.model";
import {CreateArticleLocationRequest} from "../models/create-article-location-request.model";
import {DeleteArticleLocationRequest} from "../models/delete-article-location-request.model";
import {ActivatedRoute} from "@angular/router";
import {Table} from "primeng/table";

@Component({
  selector: 'app-article-location-page',
  templateUrl: './article-location-page.component.html'
})
export class ArticleLocationPageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  baseForm: FormGroup = new FormGroup({})
  deleteForm: FormGroup = new FormGroup({})
  error: string | null = null;
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;
  filters: { [key: string]: any } = {};
  noDataReturned: boolean = false;
  @ViewChild('dt') table?: Table;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    public articleLocationState: ArticleLocationStateService,
  ) { }

  ngOnInit(){
    this.subscriptions.add(
      this.getAllArticleLocations()
    )

    this.initializeForms();

    this.route.queryParams.subscribe(params => {
      this.filters['articleCode'] = { value: params['articleCode'] || '' };
      this.filters['locationCode'] = { value: params['locationCode'] || '' };
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private initializeForms(){
    this.baseForm = new FormGroup({
      articleCode: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      locationCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(128)
      ]),
      count: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ])
    },{updateOn:'change'});

    this.deleteForm = new FormGroup({
      articleCode: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      locationCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(128)
      ])
    })
  }

  private getAllArticleLocations(): Subscription{
    return this.articleLocationState.getArticleLocations()
      .subscribe({
        next:(articleLocations)=>{
          this.articleLocationState.setArticleLocations(articleLocations)
        },
        error:(error)=>{
          this.articleLocationState.setError(error)
        },
        complete:() => {
          this.articleLocationState.setLoading(false)
        }
      })
  }

  copyCodeToClipboard(code: string) {
    navigator.clipboard.writeText(code)
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Code ${code} copied to clipboard` });
  }

  onRowEditSave(articleLocation: ArticleLocation) {
    let request: UpdateArticleLocationRequest = {
      articleCode: articleLocation.articleCode,
      locationCode: articleLocation.locationCode,
      count: articleLocation.count
    }

    this.articleLocationState.updateArticleLocation(request)}

  createArticleLocation() {
    let request: CreateArticleLocationRequest = {
      articleCode: Number(this.baseForm.value.articleCode) as number,
      locationCode: this.baseForm.value.locationCode as string,
      count: Number(this.baseForm.value.count) as number
    };

    this.articleLocationState.createArticleLocation(request)
    this.initializeForms()
  }

  deleteArticleLocation() {
    let request: DeleteArticleLocationRequest = {
      articleCode: Number(this.deleteForm.value.articleCode) as number,
      locationCode: this.deleteForm.value.locationCode as string
    }

    this.articleLocationState.deleteArticleLocation(request)
    this.initializeForms()
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
