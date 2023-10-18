import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, takeUntil } from 'rxjs';
import { FormControlValueAccessor } from './form-control-value-accessor';
import { MaskEnum } from './mask.enum';

@Component({
  selector: 'lib-input',
  template: `
    <ng-container *ngIf="!decimal && !textarea && !ngModel">
      <div class="form-group" *ngIf="type !== 'file'">
        <label
          [for]="id"
          [ngClass]="{ required: required, 'input-small': small }"
          >{{ label }}
          <i
            *ngIf="recebeIcone"
            class="{{ recebeIcone }} cursor-pointer"
            tooltipPosition="top"
          ></i
        ></label>
        <div class="position-relative">
          <input
            #input
            [type]="type"
            [min]="min"
            [max]="max"
            [formControl]="control"
            [required]="required"
            [value]="value"
            [readonly]="disabled"
            [placeholder]="placeholder"
            [autocomplete]="autocomplete"
            [ngClass]="{
              'text-uppercase': uppercase,
              'input-small': small,
              pointer: cursorPointer
            }"
            [minlength]="minlength"
            [maxlength]="maxlength"
            [name]="id"
            [id]="id"
          />
          <i (click)="clickIcon()" class=" {{ icone }} icone-senha"></i>
        </div>
      </div>
    </ng-container>
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  styleUrls: ['./input.component.scss'],
})
export class InputComponent
  extends FormControlValueAccessor
  implements OnInit, AfterViewInit
{
  @ViewChild('input')
  input!: ElementRef;

  @Input() textarea = false;

  @Input() recebeIcone!: string;

  @Input() recebeIconeLabel!: boolean;

  @Input() recebeTextoIcone!: string;

  @Input() recebeTextoIconeLabel!: string;

  @Input() label!: string;

  @Input() icone!: string;

  @Input() iconeLabel!: string;

  @Input() required!: boolean;

  @Input() autocomplete = '';

  @Input() type = 'text';

  @Input() mask!: string;

  @Input() disabled!: boolean;

  @Input() uppercase!: boolean;

  @Input() maxlength!: number;

  @Input() max: any;

  @Input() minlength!: number;

  @Input() min: any;

  @Input() placeholder!: string;

  @Input() id!: string;

  @Input() decimal!: boolean;

  @Input() small!: boolean;

  @Input() value!: string;

  @Input() ngModel!: boolean;

  @Input() dropSpecialCharacters!: boolean;

  @Input() cursorPointer!: boolean;

  @Output() onSearch = new EventEmitter<string>();

  @Output() onIconClick = new EventEmitter<any>();

  @Input()
  options: any = {
    thousands: '.',
    decimal: ',',
    prefix: '',
    align: 'left',
    precision: 2,
  };

  recebeMask!: string;
  prefix = '';
  thousandSeparator = '';
  decimalMarker = '';

  constructor(@Self() @Optional() ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {
    this.setupControlAndValidation();

    this.prefix = '';
    this.thousandSeparator = '';
    this.decimalMarker = '';

    if (this.mask == 'telefone') {
      this.recebeMask = MaskEnum.telefone;
    } else if (this.mask == 'cpf') {
      this.recebeMask = MaskEnum.cpf;
    } else if (this.mask == 'cnpj') {
      this.recebeMask = MaskEnum.cnpj;
    } else if (this.mask == 'cep') {
      this.recebeMask = MaskEnum.cep;
    } else if (this.mask == 'cfop') {
      this.recebeMask = MaskEnum.cfop;
    } else if (this.mask == 'ncm') {
      this.recebeMask = MaskEnum.ncm;
    } else if (this.mask == 'number') {
      this.recebeMask = MaskEnum.number;
    } else if (this.mask == 'uf') {
      this.recebeMask = MaskEnum.uf;
    } else if (this.mask == 'currency') {
      this.recebeMask = MaskEnum.currency;
      this.prefix = 'R$';
      this.thousandSeparator = '.';
      this.decimalMarker = ',';
    } else if (this.mask == 'ie') {
      this.recebeMask = MaskEnum.ie;
    } else if (this.mask == 'iePropRural') {
      this.recebeMask = MaskEnum.iePropRural;
    } else if (this.mask == 'chaveNf') {
      this.recebeMask = MaskEnum.chaveNf;
    } else if (this.mask == 'rg') {
      this.recebeMask = MaskEnum.rg;
    } else if (this.mask == 'cpfCnpj') {
      this.recebeMask = MaskEnum.cpfCnpj;
    } else if (this.mask == 'data') {
      this.recebeMask = MaskEnum.data;
    }

    this.placeholder == undefined ? (this.placeholder = '') : null;
  }

  ngAfterViewInit(): void {
    this.search();
  }

  search(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        takeUntil(this.destroyed$)
      )
      .subscribe((event: any) => {
        const value = (<HTMLInputElement>event.target).value;
        this.onSearch.emit(value);
      });
  }

  clickIcon(): void {
    this.onIconClick.emit();
  }

  notifyOnChange(obj: any): void {}

  setRequired(required: boolean): void {
    this.required = required;
  }

  getValue(): any {
    return this.control.value;
  }

  isRequired(): boolean {
    return this.required;
  }

  disable(): void {}
}
