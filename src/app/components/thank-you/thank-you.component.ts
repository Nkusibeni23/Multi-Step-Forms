import { Component, OnInit } from '@angular/core';
import { StepCounterService } from '../../services/step-counter.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css',
})
export class ThankYouComponent implements OnInit {
  constructor(private stepCounterService: StepCounterService) {}

  ngOnInit(): void {
    this.stepCounterService.resetForm();
  }
}
