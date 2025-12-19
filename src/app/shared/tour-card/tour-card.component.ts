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
  @Input() cardWidth = '420px';

  readonly colors = ["aqua", "green", "purple", "red"];

  public themeClass = 'theme-aqua';

  private readonly defaultTour: Partial<Tour> = {
    "id": 1,
    "title": "Chao Phraya",
    "location": "Thailand",
    "duration": 7,
    "price": 98,
    "oldPrice": 134,
    "sale": true,
    "category": "Adventure Travel",
    "categoryColor": "#FFB400",
    "rating": 4.8,
    "reviewsCount": 128,
    "image": "tour-card/Chao Phraya.png",
    "gallery": [],
    "shortDescription": "Boat tour in the capital of Thailand",
    "description": "Boat tour in the capital of Thailand, Bangkok, to see the beautiful palaces and monuments from the water",
    "longDescription": "Are you looking for an adventure of a lifetime? Join us on an unforgettable journey through some of the world's most stunning landscapes and cultural destinations. Our expertly curated tours take you to incredible destinations, from the rugged mountains of Patagonia to the vibrant cities of Asia. Our itineraries are designed to immerse you in the local culture, with opportunities to meet locals, try new foods, and learn about the history and traditions of each destination. Our experienced guides will lead you through each destination, sharing their knowledge and passion for travel. We offer a range of activities to suit every traveler, from hiking and kayaking to cultural tours and culinary experiences. Our accommodations are carefully selected for comfort and convenience, with options to suit every budget. Whether you prefer luxurious boutique hotels or cozy homestays, we have something for everyone. At every step of the journey, we prioritize sustainability and responsible tourism. We work with local communities to ensure that our tours have a positive impact on the environment and the people we meet along the way. Join us on a journey of discovery and exploration, and discover the world's most incredible destinations with us. This magnificent boat tour along the Chao Phraya River offers a unique perspective of Bangkok's most iconic landmarks. Glide past golden temples, ornate palaces, and traditional wooden houses on stilts as you experience the heart of Thai culture from the water. The river has been the lifeblood of Bangkok for centuries, and our expert guides will share fascinating stories about the city's history and development along its banks.",
    "featured": true,
    "difficulty": "Easy"
  };

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    this.themeClass = this.computeThemeClass();
    console.debug('Tour', this.tour?.title, 'index', this.index, 'theme', this.themeClass);
  }

  get displayTour(): Partial<Tour> {
    return this.tour ?? this.defaultTour;
  }

  go(): void {
    if (this.tour?.id != null) {
      this.router.navigate(['/tour', this.tour.id]);
    }
  }

  private computeThemeClass(): string {
    if (this.tour && (this.tour as any).color) {
      const c = String((this.tour as any).color).toLowerCase();
      if (this.colors.includes(c)) {
        return `theme-${c}`;
      }
    }

    const idx = Math.max(0, Math.floor(this.index || 0));
    const color = this.colors[idx % this.colors.length];
    return `theme-${color}`;
  }
}
