import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToggleModule } from '../toggle';

@Component({
  selector: 'lib-menu',
  template: `
    <div class="menu-container">
      <img
        src="assets/images/kanban-logo.svg"
        alt="Logo Kanban"
        class="logo-img"
      />

      <nav class="nav-container">
        <p class="color-md-grey font-12 font-700 spacing-3">ALL BOARDS (3)</p>

        <div class="nav-items">
          <i class="fa-light fa-table-rows"></i>
          <span class="color-md-grey font-15 font-700">Platform Launch</span>
        </div>
        <div class="nav-items">
          <i class="fa-light fa-table-rows"></i>
          <span class="color-md-grey font-15 font-700">Marketing Plan</span>
        </div>
        <div class="nav-items">
          <i class="fa-light fa-table-rows"></i>
          <span class="color-md-grey font-15 font-700">Roadmap</span>
        </div>
        <div class="nav-items">
          <i class="fa-light fa-table-rows"></i>
          <span class="color-md-grey font-15 font-700">+ Create New Board</span>
        </div>
      </nav>

      <footer class="footer-container">
        <div class="theme-control">
          <img src="assets/images/icon-light-theme.svg" alt="" />
          <lib-toggle-button [toggleId]="'toggle'"></lib-toggle-button>
          <img src="assets/images/icon-dark-theme.svg" alt="" />
        </div>
        <div class="sidebar-visibility">
          <img src="assets/images/icon-hide-sidebar.svg" alt="" />
          <span class="color-md-grey font-15 font-700">Hide Sidebar</span>
        </div>
      </footer>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, ToggleModule],
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
