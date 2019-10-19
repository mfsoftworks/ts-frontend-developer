import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    sendForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.sendForm = this.fb.group({
            address: ['', [
                Validators.required,
                Validators.minLength(16)
            ]],
            amount: ['', Validators.required],
            otp: ['', [Validators.required]]
        });
    }

    /**
     * Get form control errors
     *
     * @param control form control name
     */
    getErrors(control: string): string {
        switch (true) {
            case this.sendForm.get(control).hasError('required'):
                return `${control} is required`;

            case this.sendForm.get(control).hasError('mustMatch'):
                return `${control} must match`;
        }
    }

    // Validate form before submission
    submit(): boolean {
        this.sendForm.markAllAsTouched();
        if (this.sendForm.invalid) { return; }

        return !1;
    }
}
