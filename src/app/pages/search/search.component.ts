import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { TourCardComponent } from '../../shared/tour-card/tour-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, TourCardComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  allTours: Tour[] = [];
  filteredTours: Tour[] = [];

  featuredTour: Tour | null = null;

  searchQuery = '';
  selectedDestination = 'All';
  destinations: string[] = [];

  categories: string[] = []; 
  selectedCategories = new Set<string>();

  durationsFilterOptions = [
    { label: '1-3 Days', min: 1, max: 3 },
    { label: '4-6 Days', min: 4, max: 6 },
    { label: '7-9 Days', min: 7, max: 9 },
    { label: '10+ Days', min: 10, max: 999 },
  ];
  selectedDurations = new Set<string>();

  priceMax = 2000;
  priceRange = 5000;

  saleOnly = false;

  difficulties = ["Easy", "Medium", "Difficult", "Challenging"];
  selectedDifficulties = new Set<string>();


  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.tourService.getAll().subscribe(list => {
      this.allTours = list.map(t => this.normalize(t));
      this.featuredTour = this.allTours.find(t => t.featured) ?? null;

      this.destinations = Array.from(new Set(this.allTours.map(t => t.location))).sort();
      this.categories = Array.from(new Set(this.allTours.map(t => t.category))).sort();

      const maxPrice = this.allTours.reduce((m, t) => Math.max(m, t.price), 0);
      this.priceMax = Math.ceil(maxPrice / 50) * 50; 
      this.priceRange = this.priceMax;

      this.applyFilters();
    });
  }

  private normalize(t: any): Tour {
    const duration = typeof t.duration === 'number'
      ? t.duration
      : (typeof t.duration === 'string' ? parseInt(t.duration, 10) || 0 : 0);

    return {
      ...t,
      duration,
      category: t.category ?? t.typology ?? 'Other',
      categoryColor: t.categoryColor ?? '#999999',
      rating: t.rating ?? 0,
      reviewsCount: t.reviewsCount ?? 0,
      shortDescription: t.shortDescription ?? (t.description ? t.description.substring(0, 80) : ''),
      image: t.image ?? 'assets/img/no-image.jpg'
    } as Tour;
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  toggleCategory(cat: string): void {
    if (this.selectedCategories.has(cat)) this.selectedCategories.delete(cat);
    else this.selectedCategories.add(cat);
    this.onFilterChange();
  }

  toggleDuration(label: string): void {
    if (this.selectedDurations.has(label)) this.selectedDurations.delete(label);
    else this.selectedDurations.add(label);
    this.onFilterChange();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedDestination = 'All';
    this.selectedCategories.clear();
    this.selectedDurations.clear();
    this.priceRange = this.priceMax;
    this.saleOnly = false;
    this.selectedDifficulties.clear();
    this.onFilterChange();
  }

  applyFilters(): void {
    let list = [...this.allTours];

    const q = (this.searchQuery || '').trim().toLowerCase();
    if (q) {
      list = list.filter(t => (t.title + ' ' + t.location).toLowerCase().includes(q));
    }

    if (this.selectedDestination && this.selectedDestination !== 'All') {
      list = list.filter(t => t.location === this.selectedDestination);
    }

    if (this.selectedCategories.size > 0) {
      list = list.filter(t => this.selectedCategories.has(t.category));
    }

    if (this.selectedDurations.size > 0) {
      list = list.filter(t => {
        return Array.from(this.selectedDurations).some(label => {
          const opt = this.durationsFilterOptions.find(o => o.label === label);
          if (!opt) return false;
          return t.duration >= opt.min && t.duration <= opt.max;
        });
      });
    }

    if (this.selectedDifficulties.size > 0) {
      list = list.filter(t => this.selectedDifficulties.has(t.difficulty || ''));
    }


    list = list.filter(t => t.price <= (this.priceRange || this.priceMax));

    if (this.saleOnly) {
      list = list.filter(t => !!t.sale);
    }

    this.filteredTours = list;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filteredTours.length / this.itemsPerPage));
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  get pageStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get pagedTours(): Tour[] {
    const start = this.pageStart;
    return this.filteredTours.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isCategorySelected(c: string): boolean {
    return this.selectedCategories.has(c);
  }
  isDurationSelected(label: string): boolean {
    return this.selectedDurations.has(label);
  }

  toggleDifficulty(level: string): void {
    if (this.selectedDifficulties.has(level)) this.selectedDifficulties.delete(level);
    else this.selectedDifficulties.add(level);
    this.onFilterChange();
  }

  isDifficultySelected(level: string): boolean {
    return this.selectedDifficulties.has(level);
  }
}
