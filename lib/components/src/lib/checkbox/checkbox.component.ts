import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self, SimpleChanges } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from 'forms';
import { FormControlValueAccessor } from './form-control-value-accessor';

@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class CheckboxComponent extends FormControlValueAccessor {
  @Input() label = '';
  @Input() disabled!: boolean;
  @Input() checked = false;
  @Input() indeterminate!: boolean;
  @Input() recebeIcone!: boolean;
  @Input() recebeTextoIcone!: string;
  @Input() icone!: string;
  isChecked = true;

  constructor(@Self() @Optional() ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {
    this.setupControlAndValidation();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (this.disabled) this.control.disable();
      else this.control.enable();
    }
  }

  toggleChecked() {
    this.isChecked = !this.isChecked;
  }

  notifyOnChange(obj: any): void {}

  setRequired(required: boolean): void {}

  getValue(): any {
    return this.control.value;
  }

  isRequired(): boolean {
    return false;
  }
}
