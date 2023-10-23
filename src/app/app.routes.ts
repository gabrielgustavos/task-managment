import { Route } from '@angular/router';
import { BoardComponent } from 'components';

export const appRoutes: Route[] = [
  {
    path: 'board/:id',
    component: BoardComponent,
  },
];
