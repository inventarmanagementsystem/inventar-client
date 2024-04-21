import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, map, Subject, Subscription} from "rxjs";
import {ArticleStateService} from "../services/article-state.service";
import {Router} from "@angular/router";
import {Article} from "../models/article.model";
import {MessageService, SortEvent} from "primeng/api";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html'
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  clonedArticles: { [s: string]: Article } = {};

  constructor(
    public articleState: ArticleStateService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(){
    this.subscriptions.add(
      this.getAllArticles()
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
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
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Article is updated' });
  }
}
