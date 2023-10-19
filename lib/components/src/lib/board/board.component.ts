import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'lib-board',
  template: `
    <div class="board-container">
      <span class="color-md-grey font-18 font-700">This board is empty. Create a new column to get started.</span>
      <lib-button texto="Add New Column" [iconeEsquerda]="true" icone="fa-light fa-plus"></lib-button>
    </div>
  `,
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [ButtonComponent]
})

export class BoardComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}