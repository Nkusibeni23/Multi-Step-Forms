import { Component, OnInit } from '@angular/core';
import { StepCounterService } from '../../../services/step-counter.service';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css',
})
export class SidebarItemComponent implements OnInit {
  counter: number = 1;
  steps = [
    {
      counter: 1,
      step: 'STEP 1',
      title: 'YOUR INFO',
    },
    {
      counter: 2,
      step: 'STEP 2',
      title: 'SELECT PLAN',
    },
    {
      counter: 3,
      step: 'STEP 3',
      title: 'ADD-ONS',
    },
    {
      counter: 4,
      step: 'STEP 4',
      title: 'SUMMARY',
    },
  ];

  constructor(private stepCounterService: StepCounterService) {}

  ngOnInit(): void {
    this.stepCounterService.currentStep$.subscribe((step) => {
      this.counter = step;
    });
  }
}
