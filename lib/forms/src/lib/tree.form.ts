import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  AbstractControlOptions,
} from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';

export class ItemValidator {
  control!: string;
  validators!: ValidatorFn;
}

export class TreeFormGroup extends FormGroup {
  protected destroy$ = new Subject<void>();

  constructor(
    controls: { [key: string]: AbstractControl },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  resetControl(
    path: string | (string | number)[],
    value?: any,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) {
    this.get(path)!.reset(value, options);
  }

  clearSpecificControls(controls: string[]) {
    Object.keys(this.value).forEach((key) => {
      if (controls.indexOf(key) > -1) {
        this.get(key)!.clearValidators();
        this.get(key)!.updateValueAndValidity();
      }
    });
  }

  resetAllControls(controls = this.controls) {
    Object.values(controls).forEach((control) => {
      control.clearValidators();
      control.updateValueAndValidity();

      if (control instanceof FormGroup) {
        this.resetAllControls(control.controls);
      }
    });
  }

  resetExceptControl(
    exceptKeys: string[],
    value?: any,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) {
    Object.keys(this.value).forEach((key) => {
      if (exceptKeys.indexOf(key) > -1) return;
      this.get(key)!.reset(value, options);
    });
  }

  addValidatorsManyControls(
    controls: string[],
    validators: ValidatorFn[],
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) {
    Object.keys(this.value).forEach((key) => {
      if (controls.indexOf(key) == 0) {
        const control = this.get(key);
        if (control) {
          control.setValidators(validators);
          control.updateValueAndValidity();
        }
      }
    });
  }

  addSpecificValidators(
    itens: ItemValidator[],
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) {
    itens.forEach((item) => {
      Object.keys(this.value).forEach((key) => {
        if (item.control.indexOf(key) == 0) {
          const control = this.get(item.control);
          if (control) {
            control.setValidators(item.validators);
            control.updateValueAndValidity();
          }
        }
      });
    });
  }

  getControlValue(path: string | (string | number)[]): any {
    return this.get(path)!.value;
  }

  setControlValue(
    path: string | (string | number)[],
    value: any,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    }
  ) {
    this.get(path)!.setValue(value, options);
  }

  controlValueChanges(path: string | (string | number)[]): Observable<any> {
    return this.get(path)!.valueChanges;
  }

  clearFormArray(array: FormArray) {
    while (array.length !== 0) {
      array.removeAt(0);
    }
  }

  toggleDisabled(
    target: string | (string | number)[],
    source: string | (string | number)[],
    predicate: (value: any) => boolean
  ): Subscription {
    return this.controlValueChanges(source).subscribe((value) => {
      const control = this.get(target);
      if (predicate(value)) {
        control!.disable();
        control!.reset();
      } else {
        control!.enable();
      }
    });
  }

  disableWhenFalse(
    target: string | (string | number)[],
    source: string | (string | number)[]
  ): Subscription {
    return this.toggleDisabled(target, source, (value) => value !== true);
  }

  disableWhenTrue(
    target: string | (string | number)[],
    source: string | (string | number)[]
  ): Subscription {
    return this.toggleDisabled(target, source, (value) => value === true);
  }

  disableWhenFalseOrEmpty(
    target: string | (string | number)[],
    source: string | (string | number)[]
  ): Subscription {
    return this.toggleDisabled(target, source, (value) => {
      return (
        value === null || value === undefined || value === '' || value === false
      );
    });
  }

  disableWhenLessThanOne(
    target: string | (string | number)[],
    source: string | (string | number)[]
  ): Subscription {
    return this.toggleDisabled(target, source, (value) => {
      return value === null || value === undefined || value <= 0;
    });
  }

  createFormControl(
    value?: any,
    opts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
  ) {
    return new FormControl(
      { value, disabled: this.disabled },
      opts,
      asyncValidator
    );
  }

  patchFormArray(key: string, value: any[], callback: (item: any) => void) {
    const arr = this.get(key) as FormArray;
    while (arr.length) {
      arr.removeAt(0);
    }

    if (value && value.length) {
      value.forEach((item: any) => callback.call(this, item));
    }
  }
}
