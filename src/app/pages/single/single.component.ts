import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-single',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  public tour: Tour | null = null;

  constructor(private route: ActivatedRoute, private tourSvc: TourService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.tourSvc.getById(id).subscribe(t => this.tour = t ?? null);
    }
  }
}
