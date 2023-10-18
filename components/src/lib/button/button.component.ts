import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-button',
  template: `<div class="btn-custom">
    <button
      [title]="title"
      type="submit"
      [disabled]="disabled"
      [ngClass]="{
        'small': small,
        'secondary': buttonSecondary,
        'destructive': buttonDestructive,
      }"
    >
      <i
        *ngIf="iconeEsquerda && icone"
        class="{{ icone }}"
        [ngClass]="{ 'ml-button': !onlyIcon }"
      ></i>
      {{ texto }}
      <i
        *ngIf="!iconeEsquerda && icone"
        class="{{ icone }}"
        [ngClass]="{ 'mr-button': !onlyIcon }"
      ></i>
    </button>
  </div> `,
  standalone: true,
  styleUrls: ['./button.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ButtonComponent implements OnInit {
  @Input() iconeEsquerda!: boolean;
  @Input() texto!: string;
  @Input() icone!: string;
  @Input() disabled!: boolean;
  @Input() onlyIcon!: boolean;
  @Input() buttonSecondary!: boolean;
  @Input() buttonDestructive!: boolean;
  @Input() title!: string;
  @Input() small!: boolean;

  constructor() {}

  ngOnInit() {}
}
