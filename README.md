
## Hosted Link

https://multi-step-forms-chi.vercel.app/

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Services](#services)

## Installation

1. Clone the repository:
    ```bash
    git clone https://git@github.com:DuxEva/multi-step-form.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the application:
    ```bash
    ng serve
    ```

    The application will be accessible at `http://localhost:4200`.

## Usage

1. Navigate through the different steps to select a plan.
2. Choose additional add-ons as needed.
3. Review the summary to see the selected plan and add-ons along with the total price.

## Components

This component manages the navigation between different steps of the subscription process.

**Template: `app.component.html`**

```html
<div class="steps-container">
  <ng-container *ngIf="currentStep$ | async as currentStep">
    <app-step1 *ngIf="currentStep === 1"></app-step1>
    <app-step2 *ngIf="currentStep === 2"></app-step2>
    <app-step3 *ngIf="currentStep === 3"></app-step3>
    <app-summary *ngIf="currentStep === 4"></app-summary>
    <app-thank-you *ngIf="currentStep === 5"></app-thank-you>

    <button (click)="prevStep()" [disabled]="currentStep === 1">Previous</button>
    <button (click)="nextStep()" [disabled]="currentStep === 4">Next</button>
  </ng-container>
</div>
```
