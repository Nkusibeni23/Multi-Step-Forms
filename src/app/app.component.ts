import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StepCounterService } from './services/step-counter.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  counter: number = 1;
  isValidated: boolean = false;
  @Output() triggerValidation = new EventEmitter<void>();

  constructor(
    private stepCounter: StepCounterService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.stepCounter.currentStep$.subscribe((step) => {
      this.counter = step;
    });
  }

  nextStep() {
    if (this.counter === 1 && !this.isValidated) {
      this.triggerValidation.emit();
      return;
    }
    this.stepCounter.updateStep(this.counter + 1);
  }

  prevStep() {
    this.stepCounter.updateStep(this.counter - 1);
  }

  handleIsValidated(isValid: boolean) {
    this.isValidated = isValid;
  }
}
