import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HeaderComponent {
  @Input() title = '';
  @Input() iconsUrl = '';
  @Input() currentTheme  = '';
  @Output() changeTheme = new EventEmitter<void>();
  isChecked = false;
  constructor(){}

  ngOnInit(){
    const darkTheme = localStorage.getItem('theme');
    if(darkTheme === 'dark'){
      this.isChecked = true;
    }
  }

  onChangeIconBg(){
    switch(this.title){
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

  onChangeTheme() {
    this.changeTheme.emit();
  }

  
}
