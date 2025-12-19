import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { TourService } from '../../services/tour.service'
import { Tour } from '../../models/tour.model'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { TourCardComponent } from '../../shared/tour-card/tour-card.component'

@Component({
  selector: 'app-single',
  standalone: true,
  imports: [CommonModule, FormsModule, TourCardComponent],
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  tours: Tour[] = []
  sliderIndex = 0
  selectedIndex = 0

  adults = 1
  children = 0

  bookingFrom: string = new Date().toISOString().split('T')[0]
  bookingTo: string = new Date().toISOString().split('T')[0]

  healthInsurance = false
  medicalInsurance = false

  isLoggedIn = false
  currentUser: any = null

  bookingsKey = 'bookings'
  bookingSuccess = false

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.currentUser = JSON.parse(localStorage.getItem('user') || 'null')
    this.isLoggedIn = !!this.currentUser

    this.tourService.getAll().subscribe(tours => {
      this.tours = tours
      const found = tours.findIndex(t => t.id === id)
      this.sliderIndex = found !== -1 ? found : 0
      this.selectedIndex = this.sliderIndex
    })
  }

  bookTour() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth'])
      return
    }

    if (!this.bookingFrom || !this.bookingTo) return
    if (this.bookingFrom > this.bookingTo) return

    const booking = {
      id: Date.now(),
      userId: this.currentUser.id,
      userEmail: this.currentUser.email,
      tourId: this.activeTour?.id,
      tourTitle: this.activeTour?.title,
      from: this.bookingFrom,
      to: this.bookingTo,
      adults: this.adults,
      children: this.children,
      healthInsurance: this.healthInsurance,
      medicalInsurance: this.medicalInsurance,
      totalPrice: this.getTotalPrice(),
      bookedAt: new Date().toISOString()
    }

    const bookings = JSON.parse(localStorage.getItem(this.bookingsKey) || '[]')
    bookings.push(booking)
    localStorage.setItem(this.bookingsKey, JSON.stringify(bookings))

    console.log('📦 BOOKINGS STORED IN LOCALSTORAGE:', bookings)

    this.bookingSuccess = true
  }

  get activeTour(): Tour | null {
    return this.tours[this.selectedIndex] ?? null
  }

  getMapUrl(location: string, title: string): SafeResourceUrl {
    const query = encodeURIComponent(`${title}, ${location}`)
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${query}&output=embed`
    )
  }

  incrementAdults() {
    this.adults++
  }

  decrementAdults() {
    if (this.adults > 1) this.adults--
  }

  incrementChildren() {
    this.children++
  }

  decrementChildren() {
    if (this.children > 0) this.children--
  }

  getChildPrice(): number {
    return this.activeTour ? Math.round(this.activeTour.price * 0.5) : 0
  }

  getTotalPrice(): number {
    if (!this.activeTour) return 0

    let total = this.activeTour.price * this.adults
    total += this.getChildPrice() * this.children

    if (this.healthInsurance) total += 220
    if (this.medicalInsurance) total += 45

    return total
  }

  prev() {
    if (this.sliderIndex > 0) this.sliderIndex--
  }

  next() {
    if (this.sliderIndex < this.tours.length - 3) this.sliderIndex++
  }

  get translateX(): string {
    return `translateX(-${this.sliderIndex * (33.3333 + 2)}%)`
  }

  selectTour(index: number) {
    this.selectedIndex = index
  }

  getRandomTours(): Tour[] {
    const others = this.tours.filter(t => t.id !== this.activeTour?.id)
    return others.sort(() => 0.5 - Math.random()).slice(0, 3)
  }

  navigateToTour(id: number) {
    this.router.navigate(['/single', id])
    window.scrollTo(0, 0)
  }
}
