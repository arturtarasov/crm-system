import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OverViewPage, AnalyticsPage } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {
    constructor(private http: HttpClient) {

    }

    getOverview(): Observable<OverViewPage> {
        return this.http.get<OverViewPage>('/api/analytics/overview');
    }

    getAnalytics(): Observable<AnalyticsPage> {
      return this.http.get<AnalyticsPage>('/api/analytics/analytics');
  }
}
