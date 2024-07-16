import { Component, Input, OnInit } from '@angular/core';
import { StepCounterService } from '../../services/step-counter.service';
import { ADDON } from '../../../types.common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  selectedPlan: {
    name: string;
    pricePerMonth: number;
    pricePerYear: number;
    isMonthly: boolean;
  } | null = null;
  selectedAddOns: ADDON[] = [];
  totalPrice: number = 0;
  counter: number = 0;

  constructor(private stepService: StepCounterService) {}

  ngOnInit() {
    this.stepService.currentStep$.subscribe((step) => {
      this.counter = step;
    });
    const planData = this.stepService.getPlan();
    this.selectedPlan = {
      name: planData.selectedPlan.name,
      pricePerMonth: planData.selectedPlan.pricePerMonth,
      pricePerYear: planData.selectedPlan.pricePerYear,
      isMonthly: planData.isMonthly,
    };

    this.selectedAddOns = this.stepService
      .getAddOns()
      .filter((addOn) => addOn.isChosen);
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let total = this.selectedPlan
      ? this.selectedPlan.isMonthly
        ? this.selectedPlan.pricePerMonth
        : this.selectedPlan.pricePerYear
      : 0;
    this.selectedAddOns.forEach((addOn) => {
      if (this.selectedPlan?.isMonthly) {
        total += parseFloat(
          addOn.pricePerMonth.replace('+$', '').replace('/mo', '')
        );
        return;
      }
      total += parseFloat(
        addOn.pricePerYear.replace('+$', '').replace('/mo', '')
      );
    });
    this.totalPrice = total;
  }

  gotToprev() {
    this.stepService.updateStep(this.counter - 1);
  }
}
