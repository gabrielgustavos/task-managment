import { CdkTableModule } from '@angular/cdk/table';
import { Component, OnInit, inject } from '@angular/core';
import { filter, takeUntil } from 'rxjs';
import { ModalRemoverComponent } from '../../index';
import { BaseComponent } from '../base.component';
import { ButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';
import { ModalService } from '../modal/modal.service';
@Component({
  selector: 'lib-board',
  template: `
    <div class="board-container">
      <!-- <span class="color-md-grey font-18 font-700">This board is empty. Create a new column to get started.</span>
      <lib-button texto="Add New Column" [iconeEsquerda]="true" icone="fa-light fa-plus"></lib-button> -->

      <div class="content-table">
        <cdk-table [dataSource]="dataSource">
          <ng-container cdkColumnDef="todo">
            <cdk-header-cell *cdkHeaderCellDef>
              <div class="circle todo"></div>

              TODO (4)
            </cdk-header-cell>
            <cdk-cell *cdkCellDef="let element">
              <lib-card
                [title]="element.title"
                [subtitle]="element.subtitle"
              ></lib-card>
            </cdk-cell>
          </ng-container>

          <ng-container cdkColumnDef="doing">
            <cdk-header-cell *cdkHeaderCellDef>
              <div class="circle doing"></div>
              DOING (6)
            </cdk-header-cell>
            <cdk-cell *cdkCellDef="let element">
              <lib-card
                [title]="element.title"
                [subtitle]="element.subtitle"
              ></lib-card>
            </cdk-cell>
          </ng-container>

          <ng-container cdkColumnDef="done">
            <cdk-header-cell *cdkHeaderCellDef>
              <div class="circle done"></div>
              DONE (7)
            </cdk-header-cell>
            <cdk-cell *cdkCellDef="let element" (click)="removerCard()">
              <lib-card
                [title]="element.title"
                [subtitle]="element.subtitle"
              ></lib-card>
            </cdk-cell>
          </ng-container>

          <cdk-header-row *cdkHeaderRowDef="displayedColumns"></cdk-header-row>
          <cdk-row *cdkRowDef="let row; columns: displayedColumns"></cdk-row>
        </cdk-table>
      </div>
    </div>
  `,
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [ButtonComponent, CardComponent, CdkTableModule],
})
export class BoardComponent extends BaseComponent implements OnInit {
  dataSource = [
    {
      title: 'Build UI for onboarding flow',
      subtitle: '0 of 3 subtasks',
    },
    {
      title: 'Build UI for onboarding flow',
      subtitle: '0 of 3 subtasks',
    },
    {
      title: 'Build UI for onboarding flow',
      subtitle: '0 of 3 subtasks',
    },
    {
      title: 'Build UI for onboarding flow',
      subtitle: '0 of 3 subtasks',
    },
    {
      title: 'Build UI for onboarding flow',
      subtitle: '0 of 3 subtasks',
    },
  ];
  displayedColumns = ['todo', 'doing', 'done'];
  private modalService = inject(ModalService);
  constructor() {
    super();
  }

  ngOnInit() {}

  removerCard() {
    const modal = this.modalService.open(ModalRemoverComponent, {
      width: '480px',
      clickOutside: true,
      data: {
        titulo: 'Delete this task?',
        mensagem:
          'Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.',
      },
    });

    modal
      .afterClosed()
      .pipe(
        takeUntil(this.destroyed$),
        filter((data: any) => data !== false)
      )
      .subscribe((data: any) => {});
  }
}
