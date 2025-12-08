import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tour } from '../../models/tour.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HighlightDirective } from '../highlight.directive';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HighlightDirective
  ],
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnChanges {

  @Input() public tour: Tour | null = null;
  @Input() public index: number = 0;

  readonly colors = ["aqua", "green", "purple", "red"];

  // computed theme class, e.g. 'theme-aqua'
  public themeClass = 'theme-aqua';

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    // compute themeClass once whenever inputs change
    this.themeClass = this.computeThemeClass();
    console.debug('Tour', this.tour?.title, 'index', this.index, 'theme', this.themeClass);
  }

  go(): void {
    if (this.tour?.id != null) {
      this.router.navigate(['/tour', this.tour.id]);
    }
  }

  private computeThemeClass(): string {
    // 1) if tour explicitly contains color, use it (and normalize)
    if (this.tour && (this.tour as any).color) {
      const c = String((this.tour as any).color).toLowerCase();
      if (this.colors.includes(c)) {
        return `theme-${c}`;
      }
    }

    // 2) fallback: use index rotation
    const idx = Math.max(0, Math.floor(this.index || 0));
    const color = this.colors[idx % this.colors.length];
    return `theme-${color}`;
  }
}
