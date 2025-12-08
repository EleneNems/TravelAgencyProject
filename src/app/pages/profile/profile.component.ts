import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, SearchBarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username = 'Elene';
  email = 'elene@example.com';
}
