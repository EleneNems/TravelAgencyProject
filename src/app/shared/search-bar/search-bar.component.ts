import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SearchBarComponent {

  destination = new FormControl('');
  typology = new FormControl('');
  date = new FormControl('');

  @Output() search = new EventEmitter<any>();

  submit() {
    this.search.emit({
      destination: this.destination.value,
      typology: this.typology.value,
      date: this.date.value
    });
  }
}
