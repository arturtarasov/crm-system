import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.less']
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  isNew = true;
  constructor(private route: ActivatedRoute, private categoriesServies: CategoriesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable;

    this.route.params
      .pipe(
        switchMap((params) => {
          if(params['id']) {
            this.isNew = false;
            return this.categoriesServies.getById(params['id'])
          }
          return of(null);
        })
      ).subscribe(
        category => {
          if(category) {
            this.form.patchValue({
              name: category.name
            });
            MaterialService.updateTextInputs();            
          }
          this.form.enable;
        },
        error => MaterialService.toast(error.error.message)
      );
  }

  onSubmit() {

  }

}
