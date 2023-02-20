import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap, map, switchMap, Observable } from 'rxjs';
import { NotificationsService } from '../notifications/notifications.service';

export interface Article {
  title: string,
  url: string,
  urlToImage: string,
  source: {
    name: string;
  };
}

interface NewsApiResponse {
  totalResults: number,
  articles: Article[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 4;
  private apiKey = '6df45e91838c4bf58432aac78c6be74e';
  private country = 'lv';

  private pagesInput: Subject<number>;
  pagesOutput: Observable<Article[]>;
  numberOfPages: Subject<number>;

  constructor(private http: HttpClient, private notificationsService: NotificationsService) {
    this.numberOfPages = new Subject();
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey', this.apiKey)
          .set('country', this.country)
          .set('pageSize', this.pageSize)
          .set('page', page);
      }),
      switchMap((params) => this.http.get<NewsApiResponse>(this.url, { params })),
      tap((response) => {
        this.notificationsService.addSuccess(`LV news list updated.`);
        const totalPages = Math.ceil(response.totalResults / this.pageSize);
        this.numberOfPages.next(totalPages);
      }),
      map((value) => value.articles)
    );
  }

  getPage (page: number) {
    this.pagesInput.next(page);
  }
}
