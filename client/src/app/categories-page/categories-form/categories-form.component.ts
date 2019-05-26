import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.less']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview : string | ArrayBuffer;
  isNew = true;
  category: Category;
  constructor(private route: ActivatedRoute, private categoriesServies: CategoriesService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable;

    this.route.params
      .pipe(
        switchMap((params) => {
          if (params['id']) {
            this.isNew = false;
            return this.categoriesServies.getById(params['id'])
          }
          return of(null);
        })
      ).subscribe(
        (category: Category) => {
          if (category) {
            this.category = category;
            this.form.patchValue({
              name: category.name
            });
            this.imagePreview = category.imgSrc;
            console.log('this.imagePreview', this.imagePreview);
            MaterialService.updateTextInputs();
          }
          this.form.enable;
        },
        error => MaterialService.toast(error.error.message)
      );
  }

  onSubmit() {
    let obs$;
    this.form.disable();
    if(this.isNew) {
      obs$ = this.categoriesServies.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesServies.update(this.category._id, this.form.value.name, this.image);
    }

    obs$.subscribe(category => {
      this.category = category;
      MaterialService.toast('Изменения сохранены');
      this.form.enable();
    }, 
    error => {
      MaterialService.toast(error.error.message);
      this.form.enable();
    })
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(file);
  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены, что хотите удалить категорию "${this.category.name}"`);
    if(decision) {
      this.categoriesServies.delete(this.category._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['categories'])
        );
    }
  }

}
