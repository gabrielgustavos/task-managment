import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { BoardFormGroup } from 'forms';
import { DataService } from 'services';
import { BaseComponent } from '../base.component';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { DialogRef } from '../modal/modal-ref';
import { DIALOG_DATA } from '../modal/modal.tokens';

@Component({
  selector: 'lib-modal-add-board',
  template: `
    <div class="content-modal fadeIn">
      <div class="header-modal">
        <h1 class="title">Add New Board</h1>
      </div>

      <div class="body-modal">
        <form [formGroup]="form" autocomplete="off" class="form-container">
          <lib-input
            formControlName="name"
            label="Name"
            placeholder="e.g. Web Design"
          ></lib-input>
          <div class="subtasks-container" formArrayName="columns">
            <div *ngFor="let column of form.columns.controls; let i = index">
              <div class="input-subtask">
                <lib-input
                  [formControlName]="i"
                  label="Columns"
                  placeholder="Todo"
                ></lib-input>
                <i
                  class="fa-solid fa-xl fa-xmark first-mark"
                  style="color: #828fa3;"
                  (click)="removeColumn(i)"
                ></i>
              </div>
            </div>
            <lib-button
              texto="+ Add New Column"
              [buttonSecondary]="true"
              (click)="addColumn()"
            ></lib-button>
          </div>
          <div class="btn-save">
            <lib-button
              texto="Create New Board"
              (click)="salvar()"
            ></lib-button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./modal-add-board.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    HttpClientModule,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  providers: [DataService],
})
export class ModalAddBoardComponent extends BaseComponent implements OnInit {
  form: BoardFormGroup = new BoardFormGroup();
  private dataService = inject(DataService);
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

  salvar() {
    this.dialogRef.close(this.form.value);
  }

  addColumn() {
    const columns = this.form.get('columns') as FormArray;
    columns.push(this.form.createColumn());
  }

  removeColumn(index: number) {
    const columns = this.form.get('columns') as FormArray;
    columns.removeAt(index);
  }
}
