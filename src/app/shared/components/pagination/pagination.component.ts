import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showFirstLast: boolean = true;
  @Input() showPageNumbers: boolean = true;
  @Input() maxVisiblePages: number = 5;

  @Output() pageChanged = new EventEmitter<number>();

  get pages(): number[] {
    const visiblePages: number[] = [];

    if (this.totalPages <= this.maxVisiblePages) {
      // Show all pages if totalPages is less than maxVisiblePages
      for (let i = 1; i <= this.totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Calculate range of visible pages
      const halfVisiblePages = Math.floor(this.maxVisiblePages / 2);
      let startPage = Math.max(this.currentPage - halfVisiblePages, 1);
      let endPage = Math.min(
        startPage + this.maxVisiblePages - 1,
        this.totalPages
      );

      // Adjust if we're near the end
      if (endPage - startPage + 1 < this.maxVisiblePages) {
        startPage = Math.max(endPage - this.maxVisiblePages + 1, 1);
      }

      // Generate page numbers
      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }

      // Add ellipsis indicators
      if (startPage > 1) {
        visiblePages.unshift(-1); // Ellipsis before
        visiblePages.unshift(1); // Always show first page
      }

      if (endPage < this.totalPages) {
        visiblePages.push(-2); // Ellipsis after
        visiblePages.push(this.totalPages); // Always show last page
      }
    }

    return visiblePages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }

  isEllipsis(page: number): boolean {
    return page < 0;
  }
}
