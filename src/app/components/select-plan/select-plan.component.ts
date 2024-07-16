import { Component } from '@angular/core';
import { StepCounterService } from '../../services/step-counter.service';

interface SelectPlan {
  id: number;
  name: string;
  imageUrl: string;
  pricePerMonth: number;
  pricePerYear: number;
  isSelected: boolean;
  amountPerMonth?: number;
  amountPerYear?: number;
}

@Component({
  selector: 'select-plan',
  templateUrl: './select-plan.component.html',
  styleUrl: './select-plan.component.css',
})
export class SelectPlanComponent {
  perMonth: boolean = true;
  selectPlan: SelectPlan = {
    id: 0,
    name: '',
    imageUrl: '',
    pricePerMonth: 0,
    pricePerYear: 0,
    isSelected: false,
  };

  selectPlans: SelectPlan[] = [
    {
      id: 1,
      name: 'Arcade',
      imageUrl: '/assets/images/icon-arcade.svg',
      pricePerMonth: 9,
      pricePerYear: 90,
      isSelected: true,
    },
    {
      id: 2,
      name: 'Advanced',
      imageUrl: '/assets/images/icon-advanced.svg',
      pricePerMonth: 12,
      pricePerYear: 120,
      isSelected: false,
    },
    {
      id: 3,
      name: 'Pro',
      imageUrl: '/assets/images/icon-pro.svg',
      pricePerMonth: 15,
      pricePerYear: 150,
      isSelected: false,
    },
  ];

  constructor(private stepService: StepCounterService) {}

  ngOnInit() {
    const planData = this.stepService.getPlan();
    this.perMonth = planData.isMonthly;
    this.selectPlans.forEach((plan) => {
      plan.isSelected = plan.id === planData.selectedPlan.id;
    });
  }

  toggleSelectPlan(index: number): void {
    this.selectPlans.forEach((plan) => (plan.isSelected = false));
    this.selectPlans[index].isSelected = true;
    this.stepService.setPlan({
      selectedPlan: this.selectPlans[index],
      isMonthly: this.perMonth,
    });
  }

  togglePlanPeriod(): void {
    this.perMonth = !this.perMonth;
    const selectedPlan = this.selectPlans.find((plan) => plan.isSelected);
    this.stepService.setPlan({
      selectedPlan: selectedPlan!,
      isMonthly: this.perMonth,
    });
  }
}
