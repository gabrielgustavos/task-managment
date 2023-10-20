import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { filter, takeUntil } from 'rxjs';
import { DataService } from 'services';
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
              <div class="card-content">
                <lib-card
                  [title]="element.title"
                  [subtitle]="element.subtitle"
                ></lib-card>
                <i class="fa-solid fa-trash"></i>
              </div>
            </cdk-cell>
          </ng-container>

          <ng-container cdkColumnDef="doing">
            <cdk-header-cell *cdkHeaderCellDef>
              <div class="circle doing"></div>
              DOING (6)
            </cdk-header-cell>
            <cdk-cell *cdkCellDef="let element">
              <div class="card-content">
                <lib-card
                  [title]="element.title"
                  [subtitle]="element.subtitle"
                ></lib-card>
                <i (click)="removerCard()" class="fa-solid fa-trash"></i>
              </div>
            </cdk-cell>
          </ng-container>

          <ng-container cdkColumnDef="done">
            <cdk-header-cell *cdkHeaderCellDef>
              <div class="circle done"></div>
              DONE (7)
            </cdk-header-cell>
            <cdk-cell *cdkCellDef="let element">
              <div class="card-content">
                <lib-card
                  [title]="element.title"
                  [subtitle]="element.subtitle"
                ></lib-card>
                <i (click)="removerCard()" class="fa-solid fa-trash"></i>
              </div>
            </cdk-cell>
          </ng-container>
          <ng-container cdkColumnDef="paused">
            <cdk-header-cell *cdkHeaderCellDef>
              <div class="circle done"></div>
              DONE (7)
            </cdk-header-cell>
            <cdk-cell *cdkCellDef="let element">
              <div class="card-content">
                <lib-card
                  [title]="element.title"
                  [subtitle]="element.subtitle"
                ></lib-card>
                <i (click)="removerCard()" class="fa-solid fa-trash"></i>
              </div>
            </cdk-cell>
          </ng-container>

          <cdk-header-row *cdkHeaderRowDef="displayedColumns"></cdk-header-row>
          <cdk-row *cdkRowDef="let row; columns: displayedColumns"></cdk-row>
        </cdk-table>
      </div>
      <div class="new-column-container">
        <span class="font-24 font-700 color-md-grey">+ New Column</span>
      </div>
    </div>
  `,
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [ButtonComponent, CardComponent, HttpClientModule, CdkTableModule],
  providers: [DataService],
})
export class BoardComponent extends BaseComponent implements OnInit {
  private dataService = inject(DataService);
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
  displayedColumns = ['todo', 'doing', 'done', 'paused'];
  private modalService = inject(ModalService);
  constructor() {
    super();
  }

  ngOnInit() {
    this.dataService.getBoards().subscribe((data) => {
      const filter = data.filter(
        (item: any) => item.name === 'Platform Launch'
      );
      const columnFilter = filter[0].columns;
      const columnTodo = columnFilter.filter(
        (item: any) => item.name === 'Todo'
      );
      console.log(columnTodo[0].name);
    });
  }

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
