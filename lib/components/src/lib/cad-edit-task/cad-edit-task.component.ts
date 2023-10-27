import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { BaseComponent } from '../base.component';
import { ButtonComponent } from '../button/button.component';
import { CheckboxComponent } from '../checkbox';
import { InputComponent } from '../input/input.component';
import { DialogRef } from '../modal/modal-ref';
import { DIALOG_DATA } from '../modal/modal.tokens';

@Component({
  selector: 'lib-cad-edit-task',
  template: `
    <div class="content-modal fadeIn">
      <div *ngIf="data === null">
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
                <i
                  class="fa-solid fa-xl fa-xmark first-mark"
                  style="color: #828fa3;"
                ></i>
              </div>
              <div class="input-subtask">
                <lib-input placeholder="e.g. Make coffee"></lib-input>
                <i class="fa-solid fa-xl fa-xmark" style="color: #828fa3;"></i>
              </div>
              <lib-button
                [buttonSecondary]="true"
                texto="+ Add New Subtask"
              ></lib-button>
            </div>
            <div>
              <label class="font-12 font-700 color-md-grey">Status</label>
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
      <div *ngIf="data !== null">
        <div class="header-modal-edit" *ngIf="data.description">
          <h1 class="title">{{ data.title }}</h1>
          <p class="font-13 font-500 color-md-grey">{{ data.description }}</p>
        </div>
        <div class="header-modal" *ngIf="!data.description">
          <h1 class="title">{{ data.title }}</h1>
        </div>

        <div class="body-modal">
          <span class="font-12 font-700 color-md-grey">
            Subtasks ( {{ subtaskCompleted }} of {{ data.subtasks.length }} )
          </span>
          <div class="checkbox-container">
            <div class="checkbox-content" *ngFor="let subtask of data.subtasks">
              <lib-checkbox
                [label]="subtask.title"
                [checked]="subtask.isCompleted"
              ></lib-checkbox>
            </div>
          </div>
          <div class="select-status">
            <label class="font-12 font-700 color-md-grey">Current Status</label>
            <ng-select
              bindLabel="name"
              [placeholder]="data.status"
              [clearable]="false"
            ></ng-select>
          </div>
          <div class="btn-save">
            <lib-button texto="Edit Task" (click)="salvar()"></lib-button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./cad-edit-task.component.scss'],
  standalone: true,
  imports: [
    InputComponent,
    CheckboxComponent,
    CommonModule,
    ButtonComponent,
    NgSelectModule,
  ],
})
export class CadEditTask extends BaseComponent implements OnInit {
  subtaskCompleted = 0;
  constructor(
    @Inject(DIALOG_DATA) public data: any,
    private dialogRef: DialogRef
  ) {
    super();
  }

  ngOnInit() {
    if (this.data !== null) this.updateSubtask();
  }

  updateSubtask() {
    this.subtaskCompleted = this.data.subtasks.filter(
      (subtask: any) => subtask.isCompleted
    ).length;
  }

  fechar() {
    this.dialogRef.close(false);
  }

  salvar() {}
}
