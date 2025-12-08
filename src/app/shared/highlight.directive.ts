import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('appHighlight') color = '#e0f7fa';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.boxShadow = `0 6px 18px ${this.color}`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.boxShadow = 'none';
  }
}
