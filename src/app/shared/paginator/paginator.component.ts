import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input('numberOfPages') set _numberOfPages (numberOfPages: number) {
    this.numberOfPages = numberOfPages;
    this.setPageOptions();
  }

  @Output() pageChanged = new EventEmitter<number>();

  numberOfPages = 0;
  pageOptions: number[] = [];
  currentPage = 1;

  constructor() {
  }

  onPageClick (page: number): void {
    this.currentPage = page;
    this.pageChanged.emit(page);
    this.setPageOptions();
  }

  setPageOptions () {
    this.pageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
    ].filter(
      (pageNumber) => pageNumber >= 1 && pageNumber <= this.numberOfPages
    );
  }
}
