import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsArticleListComponent } from './news-article-list.component';

describe('NewsArticleListComponent', () => {
  let component: NewsArticleListComponent;
  let fixture: ComponentFixture<NewsArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsArticleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
