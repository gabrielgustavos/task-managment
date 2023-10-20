import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-card',
  template: `
    <div class="card">
      <span class="font-15 font-700 text-color">{{ title }}</span>
      <span class="font-12 color-md-grey font-700">{{ subtitle }}</span>
    </div>
  `,
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [],
})
export class CardComponent implements OnInit {
  @Input() title!: string;
  @Input() subtitle!: string;
  constructor() {}

  ngOnInit() {}
}
