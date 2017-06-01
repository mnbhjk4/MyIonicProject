import { Component ,AfterViewInit} from '@angular/core';
import { CalanderService} from '../../pages/leave/calander.service';

/**
 * Generated class for the CalanderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'calander',
  templateUrl: 'calander.html'
})
export class CalanderComponent implements AfterViewInit{
  nowDate : Date = new Date();
  calanderHtml: string;

  constructor(private calanderService: CalanderService) {
  
  }

  ngAfterViewInit(): void {
    }

}
