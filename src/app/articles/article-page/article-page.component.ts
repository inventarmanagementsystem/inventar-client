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
import {LocalStorageService} from "../../utility/services/local-storage.service";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html'
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  createForm: FormGroup = new FormGroup({})
  deleteForm: FormGroup = new FormGroup({})
  error: string | null = null;
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  constructor(
    private messageService: MessageService,
    public articleState: ArticleStateService,
    private router: Router,
    private localStorageService: LocalStorageService
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

  private initializeForms() {
    const savedCreateForm = this.localStorageService.loadCreateArticleRequest();
    const savedDeleteForm = this.localStorageService.loadDeleteArticleRequest();

    this.createForm = new FormGroup(
      {
        code: new FormControl(savedCreateForm.code || '', [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]),
        name: new FormControl(savedCreateForm.name || '', [
          Validators.required,
          Validators.maxLength(128)
        ])
      },
      { updateOn: 'change' }
    );

    this.deleteForm = new FormGroup({
      code: new FormControl(savedDeleteForm.toString(), [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])
    });

    this.createForm.valueChanges.subscribe(() => {
      this.localStorageService.saveCreateArticleRequest(this.createForm.value);
    });

    this.deleteForm.valueChanges.subscribe(() => {
      this.localStorageService.saveDeleteArticleRequest(
        Number(this.deleteForm.get('code')!.value)
      );
    });
  }

  private getAllArticles(): Subscription{
    return this.articleState.getArticles()
      .pipe(
        map(articles => articles.sort((a, b) => a.name.localeCompare(b.name)))
      )
      .subscribe({
      next:(articles)=>{
        this.articleState.setArticles(articles)
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
      name: article.name
    }

    this.articleState.updateArticle(request)
  }

  createArticle() {
    let request: CreateArticleRequest = {
      code: Number(this.createForm.value.code) as number,
      name: this.createForm.value.name as string
    };

    this.articleState.createArticle(request);

    const defaultValues: CreateArticleRequest = {
      code: 0,
      name: ''
    };

    this.localStorageService.saveCreateArticleRequest(defaultValues);

    this.initializeForms();
  }

  deleteArticle() {
    let code = Number(this.deleteForm.value.code);
    this.articleState.deleteArticle(code);

    const defaultValues: number = 0;

    this.localStorageService.saveDeleteArticleRequest(defaultValues);

    this.initializeForms();
  }

  checkLocations(code: number) {
    this.router.navigate(['/article-locations'], { queryParams: { articleCode: code } });
  }
}
