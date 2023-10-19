import { Component, Inject, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { BaseComponent } from '../base.component';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { DialogRef } from '../modal/modal-ref';
import { DIALOG_DATA } from '../modal/modal.tokens';

@Component({
  selector: 'lib-cad-edit-task',
  template: `
    <div class="content-modal fadeIn">
      <div class="header-modal">
        <h1 class="title">Add New Task</h1>
      </div>

      <div class="body-modal">
        <form autocomplete="off" class="form-container">
          <lib-input
            label="Title"
            placeholder="e.g. Take coffee break"
          ></lib-input>
          <div class="textarea">
            <label>Description</label>
            <textarea
              placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
            ></textarea>
          </div>
          <div class="subtasks-container">
            <div class="input-subtask">
              <lib-input
                label="Subtasks"
                placeholder="e.g. Make coffee"
              ></lib-input>
              <i class="fa-solid fa-xl fa-xmark first-mark" style="color: #828fa3;"></i>
            </div>
            <div class="input-subtask">
              <lib-input
                placeholder="e.g. Make coffee"
              ></lib-input>
              <i class="fa-solid fa-xl fa-xmark" style="color: #828fa3;"></i>
            </div>
            <lib-button
              [buttonSecondary]="true"
              texto="+ Add New Subtask"
            ></lib-button>
          </div>
          <div>
            <label>Status</label>
            <ng-select
              [items]="[
                { id: 1, name: 'To do' },
                { id: 2, name: 'In progress' },
                { id: 3, name: 'Done' }
              ]"
              bindLabel="name"
              placeholder="Todo"
              [clearable]="false"
            ></ng-select>
          </div>
        </form>
        <div class="btn-save">
          <lib-button texto="Create Task" (click)="salvar()"></lib-button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./cad-edit-task.component.scss'],
  standalone: true,
  imports: [InputComponent, ButtonComponent, NgSelectModule],
})
export class CadEditTask extends BaseComponent implements OnInit {
  constructor(
    @Inject(DIALOG_DATA) public data: any,
    private dialogRef: DialogRef
  ) {
    super();
  }

  ngOnInit() {}

  fechar() {
    this.dialogRef.close(false);
  }

  salvar() {}
}
