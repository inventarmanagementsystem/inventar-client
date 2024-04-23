import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map, Subscription} from "rxjs";
import {ArticleStateService} from "../services/article-state.service";
import {Router} from "@angular/router";
import {Article} from "../models/article.model";
import {Confirmation, ConfirmationService, MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateArticleRequest} from "../models/create-article-request.model";
import {UpdateArticleRequest} from "../models/update-article-request.model";
import {ConfirmPopup} from "primeng/confirmpopup";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html'
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  baseForm: FormGroup = new FormGroup({})
  deleteForm: FormGroup = new FormGroup({})
  error: string | null = null;
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(
    private messageService: MessageService,
    public articleState: ArticleStateService,
    private router: Router
  ) { }

  ngOnInit(){
    this.subscriptions.add(
      this.getAllArticles()
    )

    this.initializeForms();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private initializeForms(){
    this.baseForm = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(128)
      ]),
      consumption: new FormControl('', [
        Validators.maxLength(128)
      ]),
      machinery: new FormControl('', [
        Validators.maxLength(128)
      ]),
    },{updateOn:'change'});

    this.deleteForm = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ])
    })
  }

  private getAllArticles(): Subscription{
    return this.articleState.getArticles()
      .pipe(
        map(articles => articles.sort((a, b) => a.name.localeCompare(b.name)))
      )
      .subscribe({
      next:(articles)=>{
        this.articleState.setArticles(articles)
        this.articleState.setFilteredArticles(articles)
      },
      error:(error)=>{
        this.articleState.setError(error)
      },
      complete:() => {
        this.articleState.setLoading(false)
      }
    })
  }

  copyCodeToClipboard(code: number) {
    navigator.clipboard.writeText(code.toString())
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Code ${code} copied to clipboard` });
  }

  onRowEditSave(article: Article) {
    let request: UpdateArticleRequest = {
      code: article.code,
      name: article.name,
      consumption: article.consumption,
      machinery: article.machinery
    }

    this.articleState.updateArticle(request)}

  createArticle() {
    let request: CreateArticleRequest = {
      code: Number(this.baseForm.value.code) as number,
      name: this.baseForm.value.name as string,
      consumption: this.baseForm.value.consumption.trim() === "" ? "-" : this.baseForm.value.consumption as string,
      machinery: this.baseForm.value.machinery.trim() === "" ? "-" : this.baseForm.value.machinery as string,
    };

    this.articleState.createArticle(request)
    this.initializeForms()
  }

  deleteArticle() {
    let code = Number(this.deleteForm.value.code)
    this.articleState.deleteArticle(code)
  }
}
