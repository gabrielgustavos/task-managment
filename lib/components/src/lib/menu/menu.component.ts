import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ThemeService } from 'services';
import { ToggleModule } from '../toggle/toggle.module';
@Component({
  selector: 'lib-menu',
  template: `
  <div class="menu-container">
      <img
        [src]="logo"
        alt="Logo Kanban"
        class="logo-img"
      />

      <nav class="nav-container">
        <p class="color-md-grey font-12 font-700 spacing-3">ALL BOARDS (3)</p>

        <div class="nav-items">
          <i class="fa-light fa-table-rows color-md-grey"></i>
          <span class="color-md-grey font-15 font-700">Platform Launch</span>
        </div>
        <div class="nav-items">
          <i class="fa-light fa-table-rows color-md-grey"></i>
          <span class="color-md-grey font-15 font-700">Marketing Plan</span>
        </div>
        <div class="nav-items">
          <i class="fa-light fa-table-rows color-md-grey"></i>
          <span class="color-md-grey font-15 font-700">Roadmap</span>
        </div>
        <div class="nav-items">
          <i class="fa-light fa-table-rows color-main-purple"></i>
          <span class="color-main-purple font-15 font-700">+ Create New Board</span>
        </div>
      </nav>

      <footer class="footer-container">
        <div class="theme-control">
          <img src="assets/images/icon-light-theme.svg" alt="" />
          <lib-toggle-button  (change)="toggleMode()" [toggleId]="'toggle'"></lib-toggle-button>
          <img src="assets/images/icon-dark-theme.svg"  alt="" />
        </div>
        <div class="sidebar-visibility">
          <img class="cursor-pointer" src="assets/images/icon-hide-sidebar.svg" alt="Visibility icon" id="visibility" />
          <label for="visibility" class="color-md-grey font-15 font-700 cursor-pointer">Hide Sidebar</label>
        </div>
      </footer>
    </div>
  
  `,
  standalone: true,
  imports: [CommonModule, ToggleModule],
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  themeService = inject(ThemeService)
  logo = 'assets/images/logo-dark.svg'
  constructor() {
  }

  ngOnInit() { }

  public toggleMode() {
    const theme = document.body.classList.toggle('dark-theme')
    if (theme) {
      this.logo = 'assets/images/logo-light.svg'
    } else {
      this.logo = 'assets/images/logo-dark.svg'
    }
  }
}
