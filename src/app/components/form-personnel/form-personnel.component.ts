import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepCounterService } from '../../services/step-counter.service';

interface FormField {
  id: string;
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value?: string;
}

@Component({
  selector: 'form-personnel',
  templateUrl: './form-personnel.component.html',
  styleUrls: ['./form-personnel.component.css'],
})
export class FormPersonnelComponent implements OnInit {
  form: FormGroup;
  @Output() isValidated = new EventEmitter<boolean>();
  @Input() triggerValidation: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private stepService: StepCounterService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnChanges() {
    this.triggerValidation.subscribe(() => {
      this.validate();
      this.form.markAllAsTouched();
    });
  }

  ngOnInit() {
    const personalInfo = this.stepService.getPersonalInfo();
    this.form.patchValue(personalInfo);
    this.form.valueChanges.subscribe(() => {
      this.validate();
    });
  }

  formFields: FormField[] = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      name: 'name',
      placeholder: 'e.g. Benny Chrispin',
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      name: 'email',
      placeholder: 'e.g. ndizibaidu23@gmail.com',
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'text',
      name: 'phone',
      placeholder: 'e.g. +1 234 567 890',
    },
  ];

  validate() {
    const isValid = this.form.valid;
    if (isValid) {
      this.stepService.setPersonalInfo(this.form.value);
    }
    this.isValidated.emit(isValid);
  }
}
