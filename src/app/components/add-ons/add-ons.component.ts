import { Component, OnInit } from '@angular/core';
import { StepCounterService } from '../../services/step-counter.service';
import { ADDON } from '../../../types.common';

@Component({
  selector: 'add-ons',
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.css'],
})
export class AddOnsComponent implements OnInit {
  addOns: ADDON[] = [];
  plan: {
    selectedPlan: {
      name: string;
      pricePerMonth: number;
      pricePerYear: number;
    };
    isMonthly: boolean;
  } | null = null;

  constructor(private stepService: StepCounterService) {}

  ngOnInit() {
    this.addOns = this.stepService.getAddOns();
    this.plan = this.stepService.getPlan();
  }

  toggleAddOn(index: number): void {
    this.addOns[index].isChosen = !this.addOns[index].isChosen;
    this.addOns[index];
    this.stepService.setAddOns(this.addOns);
  }
}
