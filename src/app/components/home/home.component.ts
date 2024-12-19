import { Component, inject, Input } from '@angular/core';
import { SubjectComponent } from "./subject/subject.component";
import { DataServiceService } from '../../shared/data-service.service';
import { Quizdata} from '../../shared/data.interface';
import { Output, EventEmitter } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SubjectComponent,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent {
  data: Quizdata[] = [];
  title = '';
  @Output() monitorTitle = new EventEmitter<string>();
  @Output() changeIcon = new EventEmitter<string>();
  @Input() theme = '';

  dataService = inject(DataServiceService);

  ngOnInit() {
    this.dataService.getQuizData().subscribe(data => {
      this.data = data;
    });
  }

  onMonitorSubject(subject: string) {
    this.monitorTitle.emit(this.data.find(data => data.title === subject)!.title);
    
   }
  onChangeIcon(icon: string) {
    this.changeIcon.emit(this.data.find(data => data.icon === icon)?.icon);
  }
}

