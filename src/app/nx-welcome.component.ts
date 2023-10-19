import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  BoardComponent,
  ButtonComponent,
  HeaderComponent,
  InputComponent,
  MenuComponent,
} from 'components';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    NgSelectModule,
    InputComponent,
    ButtonComponent,
    HeaderComponent,
    BoardComponent,
  ],
  template: `
    <div class="container">
    <div>
      <lib-menu></lib-menu>
    </div>
    <div>
      <lib-header>
        <lib-board></lib-board>
      </lib-header>
    </div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
