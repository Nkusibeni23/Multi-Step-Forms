import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormPersonnelComponent } from './form-personnel.component';
import { StepCounterService } from '../../services/step-counter.service';

// Define a type for the StepCounterService spy
type StepCounterServiceSpy = {
  getPersonalInfo: jest.Mock<any, any>;
  setPersonalInfo: jest.Mock<any, any>;
};

describe('FormPersonnelComponent', () => {
  let component: FormPersonnelComponent;
  let fixture: ComponentFixture<FormPersonnelComponent>;
  let stepServiceSpy: StepCounterServiceSpy;

  beforeEach(async () => {
    // Create Jest mocks for StepCounterService methods
    stepServiceSpy = {
      getPersonalInfo: jest.fn(),
      setPersonalInfo: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormPersonnelComponent],
      providers: [
        FormBuilder,
        { provide: StepCounterService, useValue: stepServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPersonnelComponent);
    component = fixture.componentInstance;

    // Mock the getPersonalInfo method to return test data
    (stepServiceSpy.getPersonalInfo as jest.Mock).mockReturnValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with values from StepCounterService', () => {
    expect(component.form.value).toEqual({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
    });
  });

  it('should validate the form and emit isValidated event', () => {
    jest.spyOn(component.isValidated, 'emit');

    component.form.controls['name'].setValue('');
    component.form.controls['email'].setValue('invalid-email');
    component.form.controls['phone'].setValue('');
    component.validate();

    expect(component.isValidated.emit).toHaveBeenCalledWith(false);
  });

  it('should correctly bind form fields and display validation errors', () => {
    const compiled = fixture.nativeElement;
    const nameInput = compiled.querySelector('input#name');
    const emailInput = compiled.querySelector('input#email');
    const phoneInput = compiled.querySelector('input#phone');

    // Check initial values
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(phoneInput.value).toBe('1234567890');

    // Simulate validation error
    component.form.controls['name'].setValue('');
    fixture.detectChanges();
    const errorMessage = compiled.querySelector('p');
    expect(errorMessage.textContent).toContain('name is required');
  });
});
