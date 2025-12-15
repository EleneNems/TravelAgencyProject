import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TourCardComponent } from '../../shared/tour-card/tour-card.component';

@Component({
  selector: 'app-single',
  standalone: true,
  imports: [CommonModule, FormsModule, TourCardComponent],
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  
  tours: Tour[] = [];
  sliderIndex = 0;
  selectedIndex = 0;

  adults = 1;
  children = 0;
  bookingDate = new Date().toISOString().split('T')[0];
  healthInsurance = false;
  medicalInsurance = false;

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
    private router: Router, // Add router to constructor
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.tourService.getAll().subscribe(tours => {
      this.tours = tours;

      const found = tours.findIndex(t => t.id === id);
      this.sliderIndex = found !== -1 ? found : 0;
      this.selectedIndex = this.sliderIndex;
    });
  }

  get activeTour(): Tour | null {
    return this.tours[this.selectedIndex] ?? null;
  }

  getMapUrl(location: string, title: string): SafeResourceUrl {
    const query = encodeURIComponent(`${title}, ${location}`);
    const searchUrl = `https://maps.google.com/maps?q=${query}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(searchUrl);
  }

  incrementAdults() {
    this.adults++;
  }

  decrementAdults() {
    if (this.adults > 1) {
      this.adults--;
    }
  }

  incrementChildren() {
    this.children++;
  }

  decrementChildren() {
    if (this.children > 0) {
      this.children--;
    }
  }

  getChildPrice(): number {
    return this.activeTour ? Math.round(this.activeTour.price * 0.5) : 0;
  }

  getTotalPrice(): number {
    if (!this.activeTour) return 0;

    let total = this.activeTour.price * this.adults;
    total += this.getChildPrice() * this.children;
    
    if (this.healthInsurance) total += 220;
    if (this.medicalInsurance) total += 45;

    return total;
  }

  prev() {
    if (this.sliderIndex > 0) {
      this.sliderIndex--;
    }
  }

  next() {
    if (this.sliderIndex < this.tours.length - 3) {
      this.sliderIndex++;
    }
  }

  get translateX(): string {
    return `translateX(-${this.sliderIndex * (33.3333 + 2)}%)`;
  }

  selectTour(index: number) {
    this.selectedIndex = index;
  }

  get formattedDate(): string {
    const date = new Date(this.bookingDate);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  getRandomTours(): Tour[] {
    const otherTours = this.tours.filter(t => t.id !== this.activeTour?.id);
    const shuffled = otherTours.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }

  navigateToTour(id: number) {
    this.router.navigate(['/single', id]);
    window.scrollTo(0, 0);
  }
}