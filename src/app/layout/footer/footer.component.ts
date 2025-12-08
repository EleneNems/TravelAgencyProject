import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `<footer class="footer">© 2025 Travel Agency</footer>`,
  styles: [`.footer { text-align:center; padding:16px; background:#eee; }`]
})
export class FooterComponent {}
