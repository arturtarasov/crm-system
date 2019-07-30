import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { OverViewPage } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.less']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('tapTarget') tapTargetRef: ElementRef;
    tapTarget: MaterialInstance;
    data$: Observable<OverViewPage>;
    yeasterday = new Date();
    constructor(private service: AnalyticsService) { }

    ngOnInit() {
      this.data$ = this.service.getOverview();
      this.yeasterday.setDate(this.yeasterday.getDate() - 1);
    }

    ngAfterViewInit() {
      this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
    }

    ngOnDestroy() {
      this.tapTarget.destroy();
    }

    openInfo() {
      this.tapTarget.open();
    }
}
