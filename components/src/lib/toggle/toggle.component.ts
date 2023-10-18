import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  SimpleChanges,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormControlValueAccessor } from './form-control-value-accessor';

@Component({
  selector: 'lib-toggle-button',
  template: `<div class="tg-list" *ngIf="!ngModel">
    <div class="tg-list-item">
      <input
        [checked]="toggleChecked"
        class="tgl tgl-ios"
        id="{{ toggleId }}"
        [formControl]="control"
        type="checkbox"
      />
      <label class="tgl-btn" for="{{ toggleId }}"></label>
    </div>
  </div> `,
  styleUrls: ['toggle.component.scss'],
})
export class ToggleComponent
  extends FormControlValueAccessor
  implements OnInit, OnDestroy, OnChanges
{
  @Input() disabled = false;
  @Input() toggleId!: string;
  @Input() toggleChecked = false;
  @Input() value: any = '';
  @Input() ngModel = false;

  constructor(@Self() @Optional() ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit() {
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

  toggleChange(event: any): void {
    this.value = event.target.checked;
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
