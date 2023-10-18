import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ButtonComponent, InputComponent, MenuComponent } from 'components';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    NgSelectModule,
    InputComponent,
    ButtonComponent,
  ],
  template: ` <lib-menu></lib-menu> `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
