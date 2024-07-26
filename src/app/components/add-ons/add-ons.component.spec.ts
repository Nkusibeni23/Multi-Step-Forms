import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOnsComponent } from './add-ons.component';
import { StepCounterService } from '../../services/step-counter.service';
import { ADDON } from '../../../types.common';

describe('AddOnsComponent', () => {
  let component: AddOnsComponent;
  let fixture: ComponentFixture<AddOnsComponent>;
  let stepService: StepCounterService;

  const mockAddOns: ADDON[] = [
    {
      type: 'Add-On 1',
      description: 'Description 1',
      pricePerMonth: '10',
      pricePerYear: '100',
      isChosen: false,
    },
    {
      type: 'Add-On 2',
      description: 'Description 2',
      pricePerMonth: '15',
      pricePerYear: '150',
      isChosen: false,
    },
  ];

  const mockPlan = {
    selectedPlan: { name: 'Plan 1', pricePerMonth: 30, pricePerYear: 300 },
    isMonthly: true,
  };

  beforeEach(async () => {
    const stepServiceSpy = {
      getAddOns: jest.fn().mockReturnValue(mockAddOns),
      getPlan: jest.fn().mockReturnValue(mockPlan),
      setAddOns: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AddOnsComponent],
      providers: [{ provide: StepCounterService, useValue: stepServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOnsComponent);
    component = fixture.componentInstance;
    stepService = TestBed.inject(StepCounterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize addOns and plan on init', () => {
    expect(component.addOns).toEqual(mockAddOns);
    expect(component.plan).toEqual(mockPlan);
  });

  it('should toggle addOn selection and update the service', () => {
    component.toggleAddOn(0);
    expect(component.addOns[0].isChosen).toBe(true);
    expect(stepService.setAddOns).toHaveBeenCalledWith(component.addOns);

    component.toggleAddOn(0);
    expect(component.addOns[0].isChosen).toBe(false);
    expect(stepService.setAddOns).toHaveBeenCalledWith(component.addOns);
  });

  it('should correctly bind addOns and plan data in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.text-4xl')?.textContent).toContain(
      'Pick add-ons'
    );
    expect(compiled.querySelector('.text-xl')?.textContent).toContain(
      'Add-ons help enhance your gaming experience.'
    );
    expect(
      compiled.querySelector('.text-xl.font-semibold')?.textContent
    ).toContain('Add-On 1');
    expect(
      compiled.querySelector('.text-xl.font-semibold')?.textContent
    ).toContain('Add-On 2');
  });
});
