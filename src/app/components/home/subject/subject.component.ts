import { CommonModule } from '@angular/common';
import { Component, Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectComponent {
  @Input() subject = '';
  @Input() image = '';
  @Input() theme = '';


  onMonitorSubject(){
    switch(this.subject){
      case 'HTML':
        return 'html';
      case 'CSS':
        return 'css';
      case 'JavaScript':
        return 'js';
      case 'Accessibility':
        return 'accessibility';
      default:
        return 'logo';
    }
  }
}

