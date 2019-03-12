import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit, OnDestroy {

    form: FormGroup;
    aSub: Subscription;

    constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });

        this.route.queryParams.subscribe((params: Params) => {
            if (params['registered']) {
                MaterialService.toast('Теперь вы можете войти в систему используя свои данные');
            } else if (params['accessDenied']) {
                MaterialService.toast('Для начала авторизуйтесь в системе');
            } else if (params['sessionFaild']) {
                MaterialService.toast('Пожалйста войдите в систему заного');
            }
        });
    }

    onSubmit() {
        this.form.disable();
        this.aSub = this.auth.login(this.form.value).subscribe(
            () => this.router.navigate(['/overview']),
            error => {
                MaterialService.toast(error.error.message);
                this.form.enable();
            }
        )
    }

    ngOnDestroy() {
        if (this.aSub) {
            this.aSub.unsubscribe();
        }
    }

}