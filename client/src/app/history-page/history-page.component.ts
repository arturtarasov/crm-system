import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OrderService } from '../shared/services/order.service';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order, Filter } from '../shared/interfaces';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.less']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: MaterialInstance;
  isFilterVisible = false;
  offset = 0;
  limit = STEP;
  orders: Order[] = [];
  oSub: Subscription;
  loading = false;
  reloading = false;
  noMoreOrders = false;
  filter: Filter = {};
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }
  ngOnDestroy() {
    this.tooltip.destroy();
    this.oSub.unsubscribe();
  }
  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }
  private fetch() {
    // const params = {
    //   offset: this.offset,
    //   limit: this.limit
    // };
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    })
    this.oSub = this.orderService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders);
      this.noMoreOrders = orders.length < STEP;
      this.loading = false;
      this.reloading = false;
    });
  }
  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.reloading = true;
    this.filter = filter;
    this.fetch();
  }

  isFiltered() : boolean {
    return Object.keys(this.filter).length !== 0;
  }
}
