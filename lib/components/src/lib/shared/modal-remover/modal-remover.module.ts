import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../button/button.component';
import { ModalRemoverComponent } from './modal-remover.component';

@NgModule({
  imports: [CommonModule, RouterModule, CommonModule, ButtonComponent],
  exports: [ModalRemoverComponent],
  declarations: [ModalRemoverComponent],
  providers: [],
})
export class ModalRemoverModule {}
