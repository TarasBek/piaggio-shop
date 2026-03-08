import { Component, Input } from '@angular/core';

@Component({
  selector: 'os-icon',
  standalone: false,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() name = '';
  @Input() size: 'small' | [number, number] | number = 'small';

  get resolvedSize(): [number, number] {
    if (Array.isArray(this.size)) {
      return this.size;
    }

    if (typeof this.size === 'number') {
      return [this.size, this.size];
    }

    return this.size === 'small' ? [16, 16] : [20, 20];
  }
}
