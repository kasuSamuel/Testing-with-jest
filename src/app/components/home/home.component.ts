import { Component, Input,ChangeDetectionStrategy } from '@angular/core';
import { SubjectComponent } from "./subject/subject.component";
import { DataServiceService } from '../../shared/data-service.service';
import { Quizdata} from '../../shared/data.interface';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SubjectComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent {
  data: Quizdata[] = [];
  title = '';
  @Output() monitorTitle = new EventEmitter<string>();
  @Output() changeIcon = new EventEmitter<string>();
  @Input() theme = '';

  constructor( private dataService: DataServiceService){}

  async ngOnInit() {
    this.data = await this.dataService.getQuizData();
  }

  onMonitorSubject(subject: string) {
    this.monitorTitle.emit(this.data.find(data => data.title === subject)!.title);
    
   }
  onChangeIcon(icon: string) {
    this.changeIcon.emit(this.data.find(data => data.icon === icon)?.icon);
  }
}

