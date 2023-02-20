import { Component } from '@angular/core';
import { Article, NewsApiService } from '../news-api.service';

@Component({
  selector: 'app-news-article-list',
  templateUrl: './news-article-list.component.html',
  styleUrls: ['./news-article-list.component.scss']
})
export class NewsArticleListComponent {
  articles: Article[] = [];
  numberOfPages = 0;

  constructor(private newsApiService: NewsApiService) {
    this.newsApiService.pagesOutput.subscribe((articles) => {
      this.articles = articles;
    });

    this.newsApiService.numberOfPages.subscribe((numberOfPages) => {
      this.numberOfPages = numberOfPages;
      console.log('NumberOfPages:', this.numberOfPages);
    });

    this.newsApiService.getPage(1);
  };

  onPageChanged (page: number) {
    this.newsApiService.getPage(page);
  }
}
