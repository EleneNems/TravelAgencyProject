import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../models/tour.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TourService {
  private url = 'assets/data/tours.json';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.url);
  }

  getById(id: number): Observable<Tour | undefined> {
    return new Observable(observer => {
      this.getAll().subscribe(list => {
        const item = list.find(t => t.id === id);
        observer.next(item);
        observer.complete();
      }, err => observer.error(err));
    });
  }

  search(query: string): Observable<Tour[]> {
    return new Observable(observer => {
      this.getAll().subscribe(list => {
        const q = query.toLowerCase();
        observer.next(list.filter(t => t.title.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)));
        observer.complete();
      }, err => observer.error(err));
    });
  }
}
