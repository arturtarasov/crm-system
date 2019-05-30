import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { OverViewPage } from '../shared/interfaces';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.less']
})
export class OverviewPageComponent implements OnInit {

  data$: Observable<OverViewPage>;
  constructor(private service: AnalyticsService) { }

  ngOnInit() {
    this.service.getOverview().subscribe(data => {
      console.log(data);
    });
  }

}
