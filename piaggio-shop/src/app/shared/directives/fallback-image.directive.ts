import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

type FallbackVariant = 'product' | 'category' | 'blog' | 'generic';

@Directive({
  selector: 'img[appFallbackImg]',
  standalone: true,
})
export class FallbackImageDirective implements OnInit {
  @Input('appFallbackImg') variant: FallbackVariant = 'generic';

  private readonly fallbackMap: Record<FallbackVariant, string> = {
    product: 'assets/fallbacks/image-placeholder.svg',
    category: 'assets/fallbacks/image-placeholder.svg',
    blog: 'assets/fallbacks/image-placeholder.svg',
    generic: 'assets/fallbacks/image-placeholder.svg',
  };

  private hasAppliedFallback = false;

  constructor(private el: ElementRef<HTMLImageElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    const src = this.el.nativeElement.getAttribute('src');
    if (!src) {
      this.applyFallback();
    }
  }

  @HostListener('error')
  handleError(): void {
    this.applyFallback();
  }

  private applyFallback(): void {
    if (this.hasAppliedFallback) {
      return;
    }
    this.hasAppliedFallback = true;
    const fallbackSrc = this.fallbackMap[this.variant] ?? this.fallbackMap.generic;
    this.renderer.setAttribute(this.el.nativeElement, 'src', fallbackSrc);
    if (!this.el.nativeElement.alt) {
      this.renderer.setAttribute(this.el.nativeElement, 'alt', 'Placeholder image');
    }
    this.renderer.addClass(this.el.nativeElement, 'has-fallback-image');
  }
}
