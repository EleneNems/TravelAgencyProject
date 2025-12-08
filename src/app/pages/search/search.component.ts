import { Component, OnInit } from '@angular/core';
import { Tour } from '../../models/tour.model';
import { TourService } from '../../services/tour.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, SearchBarComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results: Tour[] = [];

  constructor(private tourSvc: TourService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const q = this.route.snapshot.queryParamMap.get('q') || '';
    if (q) this.doSearch(q);
  }

  doSearch(q: string) {
    this.tourSvc.search(q).subscribe(list => this.results = list);
    this.router.navigate([], { queryParams: { q } });
  }
}
