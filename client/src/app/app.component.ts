import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    constructor(private auth: AuthService) {

    }

    ngOnInit() {
        const potentialToken = localStorage.getItem('auth-token');
        if (potentialToken !== null) {
            this.auth.token = potentialToken;
        }
    }
}
