import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { Router } from '@angular/router';
import { TourCardComponent } from '../../shared/tour-card/tour-card.component';

@Component({
  selector: 'app-home1',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, SearchBarComponent, TourCardComponent],
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {
  tours: Tour[] = [];
  featuredTours: Tour[] = [];

  constructor(private tourSvc: TourService, private router: Router) {}

  ngOnInit() {
  this.tourSvc.getAll().subscribe(list => {
    this.tours = list;
    this.featuredTours = list.slice(0, 3); 
  });
}

  onSearch(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}
