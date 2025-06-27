import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SvgIconComponent } from 'src/app/features/admin/components/header/svg-icon/svg-icon.component';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss',
})
export class CompletedComponent implements OnInit {
  @Input() type: string = 'classic';
  count = 5;
  private intervalId: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.router.navigate(['/']);
    // }, 5000);
    this.intervalId = setInterval(() => {
      this.count--;
      if (this.count < 0) {
        clearInterval(this.intervalId);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
