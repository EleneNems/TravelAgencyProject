import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { Home1Component } from './pages/home1/home1.component';
import { SingleComponent } from './pages/single/single.component';
import { SearchComponent } from './pages/search/search.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthComponent } from './pages/auth/auth.component';

const routes = [
  { path: '', component: Home1Component },
  { path: 'tour/:id', component: SingleComponent },
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '' } // fallback route
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // 👈 pass the actual routes array
    provideHttpClient(),
    provideAnimations()
  ]
};
