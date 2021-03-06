import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { MaterialService, MaterialDatepicker } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.less']
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;
  order: number;
  start: MaterialDatepicker;
  end: MaterialDatepicker;

  isValid = true;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.start = MaterialService.iniDatePicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.iniDatePicker(this.endRef, this.validate.bind(this));
  }

  ngOnDestroy() {
    this.start.close();
    this.end.close();
  }

  private validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }
    this.isValid = this.start.date < this.end.date; 
  }
  submitFilter() {
    const filter: Filter = {};
    if (this.order) {
      filter.order = this.order;
    }
    if(this.start.date) {
      filter.start = this.start.date;
    }
    if(this.end.date) {
      filter.end = this.end.date;
    }
    this.onFilter.emit(filter);
  }

}
