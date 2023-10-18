import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-toggle-standalone',
  template: `<div class="tg-list">
    ,
    <div class="tg-list-item">
      <input
        class="tgl tgl-ios"
        [(ngModel)]="value"
        [ngModelOptions]="{ standalone: true }"
        id="{{ toggleId }}"
        type="checkbox"
      />
      <label class="tgl-btn" for="{{ toggleId }}"></label>
    </div>
  </div>`,
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleStandaloneComponent implements OnInit {
  @Input() disabled = false;
  @Input() toggleId!: string;
  @Input() toggleChecked = false;
  @Input() value: any = '';

  constructor() {}

  ngOnInit() {}
}
