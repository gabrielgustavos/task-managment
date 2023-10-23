import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent, MenuComponent } from 'components';

@Component({
  standalone: true,
  imports: [MenuComponent, HeaderComponent, RouterModule],
  selector: 'app-root',
  template: `
    <div class="container">
      <div>
        <lib-menu></lib-menu>
      </div>
      <div>
        <lib-header>
          <router-outlet></router-outlet>
        </lib-header>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'task-managment';
}
