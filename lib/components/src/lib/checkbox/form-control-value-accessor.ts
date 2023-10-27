import { AbstractControl, ControlValueAccessor, FormControl, NgControl, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

export abstract class FormControlValueAccessor implements ControlValueAccessor {

    private subs = new Subscription();
    control = new FormControl();
    onChange = (obj: any) => {};
    onTouched = () => {};
    constructor(
        public ngControl: NgControl
    ) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    abstract notifyOnChange(obj: any): void;
    abstract setRequired(required: boolean): void;
    abstract getValue(): any;
    abstract isRequired(): boolean;

    writeValue(obj: any): void {
        if (!this.hasNgControlControl()) {
            this.control.setValue(obj);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    hasNgControlControl(): boolean {
        const control = this.ngControl?.control;
        return control !== undefined && control !== null;
    }

    getFormControl(): FormControl {
        if (this.hasNgControlControl()) {
            return this.ngControl.control as FormControl;
        }
        // since we already created a new FormControl instance
        // in the field initialization we don't have to do anything here
        // except return the control instance
        // otherwise we might overwrite the control value
        return this.control;
    }

    destroy(): void {
        this.subs.unsubscribe();
    }

    protected setupControlAndValidation(): void {
        const control = this.control = this.getFormControl();
        if (!this.hasNgControlControl()) {
            const value = this.getValue();
            if (value !== undefined || value !== null) {
                control.setValue(value);
            }
            if (this.isRequired()) {
                control.setValidators(Validators.required);
            }
            this.subs.add(
                control.valueChanges.subscribe(obj => {
                    this.onChange(obj);
                    this.notifyOnChange(obj);
                })
            );
        } else {
            const validation = getControlValidationErrors(control);
            if (validation) {
                this.setRequired(validation['required'] || false)
            }
        }
    }
}

export function getControlValidationErrors(control: AbstractControl): ValidationErrors | null {
    const validation = control.validator
        ? control.validator(new FormControl(''))
        : null;
    return validation;
}
