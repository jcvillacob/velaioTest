import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent {
  @Input() label: string = '';
  @Input() active: boolean = false;
  @Output() filterClick = new EventEmitter<void>();

  onClick() {
    this.filterClick.emit();
  }
}
