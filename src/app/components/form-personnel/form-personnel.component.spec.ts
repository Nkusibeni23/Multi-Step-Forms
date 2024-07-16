import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPersonnelComponent } from './form-personnel.component';

describe('FormPersonnelComponent', () => {
  let component: FormPersonnelComponent;
  let fixture: ComponentFixture<FormPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPersonnelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
