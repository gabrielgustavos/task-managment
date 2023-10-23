import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      <div class="content-table">
        <cdk-table [dataSource]="dataSource">
          <ng-container
            *ngFor="let column of displayedColumns; let i = index"
            cdkColumnDef="{{ column }}"
          >
            <cdk-header-cell *cdkHeaderCellDef>{{
              getColumnHeaderText(column)
            }}</cdk-header-cell>
            <cdk-cell *cdkCellDef="let element">
              <div
                class="card-content"
                *ngFor="let task of getColumnData(column)"
              >
                <lib-card
                  [title]="task.title"
                  [subtitle]="task.subtasks.length + ' subtasks'"
                ></lib-card>
                <i class="fa-solid fa-trash"></i>
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
  imports: [
    ButtonComponent,
    CommonModule,
    CardComponent,
    HttpClientModule,
    CdkTableModule,
  ],
  providers: [DataService],
})
export class BoardComponent extends BaseComponent implements OnInit {
  private dataService = inject(DataService);
  dataSource: any = [];
  displayedColumns: any = [];
  boardName!: string;
  columnName!: string;
  private columnsData: any = {};

  private modalService = inject(ModalService);
  private activatedRoute = inject(ActivatedRoute);
  constructor() {
    super();
  }

  ngOnInit() {
    this.getBoardName();
  }

  getBoardName() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const boardName = params.get('id');
      if (boardName) {
        this.fetchBoardData(boardName);
        this.getBoardItems();
        this.getDataSource();
      } else {
      }
    });
  }

  fetchBoardData(boardName: string) {
    this.dataService.getBoards().subscribe((data) => {
      const filter = data.filter((item: any) => item.name === boardName);
      this.boardName = filter[0].name;
    });
  }

  getBoardItems() {
    this.dataService.getBoards().subscribe((data) => {
      const filter = data.find((item: any) => item.name === this.boardName);
      if (filter) {
        const columns = filter.columns;
        this.displayedColumns = columns.map((obj: any) => obj.name);
      }
    });
  }

  getColumnHeaderText(column: string): string {
    const board = this.displayedColumns.find((col: any) => col === column);
    if (board) {
      return column;
    }
    return column;
  }

  getDataSource() {
    this.dataService.getBoards().subscribe((data) => {
      const filter = data.find((item: any) => item.name === this.boardName);
      if (filter) {
        const columns = filter.columns;
        this.columnsData = columns.reduce((acc: any, column: any) => {
          // Only add the column to the data if it has tasks
          if (column.tasks.length > 0) {
            acc[column.name] = column.tasks;
          }
          return acc;
        }, {});
        this.displayedColumns = Object.keys(this.columnsData);
        this.dataSource = Object.values(this.columnsData).flat();
      }
    });
  }

  getColumnData(columnName: string) {
    return this.columnsData[columnName] || [];
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
