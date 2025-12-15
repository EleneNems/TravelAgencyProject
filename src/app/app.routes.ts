import { Routes } from '@angular/router';
import { Home1Component } from './pages/home1/home1.component';
import { SingleComponent } from './pages/single/single.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { 
    path: '', component: Home1Component 
  },
  { 
    path: 'tour/:id', component: SingleComponent 
  },
  { 
    path: 'about', component: AboutComponent 
  },
  { 
    path: '**', redirectTo: '' 
  }
];
