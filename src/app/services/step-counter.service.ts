import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ADDON, SELECTEDPLAN } from '../../types.common';

@Injectable({
  providedIn: 'root',
})
export class StepCounterService {
  currentStep: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  private formData = {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
    },
    plan: {
      selectedPlan: {
        id: 1,
        name: 'Arcade',
        imageUrl: '/assets/images/icon-arcade.svg',
        pricePerMonth: 9,
        pricePerYear: 90,
        isSelected: true,
      },
      isMonthly: true,
    },
    addOns: [
      {
        isChosen: true,
        type: 'Online service',
        description: 'Access to multiplayer games',
        pricePerMonth: '+$1/mo',
        pricePerYear: '+$10/yr',
      },
      {
        isChosen: false,
        type: 'Larger storage',
        description: 'Extra 1TB of cloud save',
        pricePerMonth: '+$2/mo',
        pricePerYear: '+$20/yr',
      },
      {
        isChosen: false,
        type: 'Customizable profile',
        description: 'Custom theme on your profile',
        pricePerMonth: '+$2/mo',
        pricePerYear: '+$20/yr',
      },
    ],
  };

  currentStep$: Observable<number> = this.currentStep.asObservable();

  constructor() {}

  updateStep(step: number): void {
    this.currentStep.next(step);
  }

  getPersonalInfo() {
    return this.formData.personalInfo;
  }

  setPersonalInfo(data: { name: string; email: string; phone: string }) {
    this.formData.personalInfo = data;
  }

  getPlan() {
    return this.formData.plan;
  }

  setPlan(data: { selectedPlan: SELECTEDPLAN; isMonthly: boolean }) {
    this.formData.plan['selectedPlan'] = data.selectedPlan;
    this.formData.plan['isMonthly'] = data.isMonthly;
  }

  getAddOns() {
    return this.formData.addOns;
  }

  setAddOns(data: ADDON[]) {
    this.formData.addOns = data;
  }

  resetForm() {
    this.formData = {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
      },
      plan: {
        selectedPlan: {
          id: 1,
          name: 'Arcade',
          imageUrl: '/assets/images/icon-arcade.svg',
          pricePerMonth: 9,
          pricePerYear: 90,
          isSelected: true,
        },
        isMonthly: true,
      },
      addOns: [
        {
          isChosen: true,
          type: 'Online service',
          description: 'Access to multiplayer games',
          pricePerMonth: '+$1/mo',
          pricePerYear: '+$10/yr',
        },
        {
          isChosen: false,
          type: 'Larger storage',
          description: 'Extra 1TB of cloud save',
          pricePerMonth: '+$2/mo',
          pricePerYear: '+$20/yr',
        },
        {
          isChosen: false,
          type: 'Customizable profile',
          description: 'Custom theme on your profile',
          pricePerMonth: '+$2/mo',
          pricePerYear: '+$20/yr',
        },
      ],
    };
  }
}
