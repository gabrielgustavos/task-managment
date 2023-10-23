import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { DataService, ThemeService } from 'services';
import { ModalAddBoardComponent } from '../modal-add-board/modal-add-board.component';
import { ModalService } from '../modal/modal.service';
import { ToggleModule } from '../toggle/toggle.module';
@Component({
  selector: 'lib-menu',
  template: `
    <div class="menu-container">
      <img [src]="logo" alt="Logo Kanban" class="logo-img" />

      <nav class="nav-container">
        <p class="color-md-grey font-12 font-700 spacing-3">ALL BOARDS (3)</p>

        <div
          class="nav-items"
          *ngFor="let board of boards"
          (click)="navigateBoard(board)"
        >
          <i class="fa-light fa-table-rows color-md-grey"></i>
          <span class="color-md-grey font-15 font-700">{{ board }}</span>
        </div>

        <div class="nav-items" (click)="openModal()">
          <i class="fa-light fa-table-rows color-main-purple"></i>
          <span class="color-main-purple font-15 font-700"
            >+ Create New Board</span
          >
        </div>
      </nav>

      <footer class="footer-container">
        <div class="theme-control">
          <img src="assets/images/icon-light-theme.svg" alt="" />
          <lib-toggle-button
            (change)="toggleMode()"
            [toggleId]="'toggle'"
          ></lib-toggle-button>
          <img src="assets/images/icon-dark-theme.svg" alt="" />
        </div>
        <div class="sidebar-visibility">
          <img
            class="cursor-pointer"
            src="assets/images/icon-hide-sidebar.svg"
            alt="Visibility icon"
            id="visibility"
          />
          <label
            for="visibility"
            class="color-md-grey font-15 font-700 cursor-pointer"
            >Hide Sidebar</label
          >
        </div>
      </footer>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, HttpClientModule, ToggleModule],
  providers: [ModalService, DataService],
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  themeService = inject(ThemeService);
  modalService = inject(ModalService);
  router = inject(Router);
  private dataService = inject(DataService);

  logo = 'assets/images/logo-dark.svg';
  boards: string[] = [];
  constructor() {}

  ngOnInit() {
    this.dataService.getBoards().subscribe((data) => {
      console.log(data);
      this.boards = data.map((item: any) => item.name);
    });
  }

  navigateBoard(board: string) {
    this.router.navigate([`board/${board}`]);
  }

  public toggleMode() {
    const theme = document.body.classList.toggle('dark-theme');
    if (theme) {
      this.logo = 'assets/images/logo-light.svg';
    } else {
      this.logo = 'assets/images/logo-dark.svg';
    }
  }

  openModal() {
    const modal = this.modalService.open(ModalAddBoardComponent, {
      width: '480px',
      clickOutside: true,
    });

    modal
      .afterClosed()
      .pipe(filter((data: any) => data !== false))
      .subscribe((data: any) => {
        if (data) {
          this.boards.push(data.name);
        }
      });
  }
}
