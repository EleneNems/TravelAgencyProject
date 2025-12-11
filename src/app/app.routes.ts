import { Routes } from '@angular/router';
import { Home1Component } from './pages/home1/home1.component';
import { SingleComponent } from './pages/single/single.component';
export const routes: Routes = [
  { 
    path: '', component: Home1Component 
  },
  { 
    path: 'tour/:id', component: SingleComponent 
  },
  { 
    path: '**', redirectTo: '' 
  }
];
