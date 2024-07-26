import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPlanComponent } from './select-plan.component';
import { StepCounterService } from '../../services/step-counter.service';

// Define a type for the StepCounterService spy
type StepCounterServiceSpy = {
  getPlan: jest.Mock<any, any>;
  setPlan: jest.Mock<any, any>;
};

describe('SelectPlanComponent', () => {
  let component: SelectPlanComponent;
  let fixture: ComponentFixture<SelectPlanComponent>;
  let stepServiceSpy: StepCounterServiceSpy;

  beforeEach(async () => {
    // Create Jest mocks for StepCounterService methods
    stepServiceSpy = {
      getPlan: jest.fn(),
      setPlan: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [SelectPlanComponent],
      providers: [{ provide: StepCounterService, useValue: stepServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPlanComponent);
    component = fixture.componentInstance;

    // Mock the getPlan method to return test data
    (stepServiceSpy.getPlan as jest.Mock).mockReturnValue({
      isMonthly: true,
      selectedPlan: {
        id: 1,
        name: 'Arcade',
        imageUrl: '',
        pricePerMonth: 9,
        pricePerYear: 90,
        isSelected: true,
      },
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize plan data from StepCounterService', () => {
    expect(component.perMonth).toBe(true);
    expect(component.selectPlans[0].isSelected).toBe(true);
    expect(component.selectPlans[1].isSelected).toBe(false);
    expect(component.selectPlans[2].isSelected).toBe(false);
  });

  it('should select a plan and update StepCounterService', () => {
    const index = 2; // Select 'Pro' plan
    component.toggleSelectPlan(index);

    expect(component.selectPlans[index].isSelected).toBe(true);
    expect(component.selectPlans[0].isSelected).toBe(false);
    expect(component.selectPlans[1].isSelected).toBe(false);
    expect(stepServiceSpy.setPlan).toHaveBeenCalledWith({
      selectedPlan: component.selectPlans[index],
      isMonthly: component.perMonth,
    });
  });

  it('should toggle between monthly and yearly plans', () => {
    component.togglePlanPeriod();

    expect(component.perMonth).toBe(false);
    expect(stepServiceSpy.setPlan).toHaveBeenCalledWith({
      selectedPlan: component.selectPlans.find((plan) => plan.isSelected),
      isMonthly: component.perMonth,
    });

    // Toggle back
    component.togglePlanPeriod();
    expect(component.perMonth).toBe(true);
  });

  it('should display the correct plan price based on the selected period', () => {
    component.perMonth = true;
    fixture.detectChanges();
    const priceText = fixture.nativeElement.querySelector('#price').textContent;
    expect(priceText).toContain('9/mo');

    component.perMonth = false;
    fixture.detectChanges();
    const newPriceText =
      fixture.nativeElement.querySelector('#price').textContent;
    expect(newPriceText).toContain('90/yr');
  });
});
