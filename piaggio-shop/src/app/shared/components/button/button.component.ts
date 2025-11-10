import { Component, Input } from '@angular/core';

@Component({
  selector: 've-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label = 'Click';
  @Input() type: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() icon?: string;
  @Input() disabled = false;
}
