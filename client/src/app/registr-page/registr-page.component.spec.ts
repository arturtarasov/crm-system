import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrPageComponent } from './registr-page.component';

describe('RegistrPageComponent', () => {
  let component: RegistrPageComponent;
  let fixture: ComponentFixture<RegistrPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
