import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tour } from '../../models/tour.model';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination-card.html',
  styleUrls: ['./destination-card.css']
})
export class DestinationCardComponent {
  @Input() destination!: Tour;
}
