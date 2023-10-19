import { Component, OnInit, inject } from '@angular/core';
import { filter, takeUntil } from 'rxjs';
import { BaseComponent } from '../base.component';
import { ButtonComponent } from '../button/button.component';
import { CadEditTask } from '../cad-edit-task/cad-edit-task.component';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'lib-header',
  template: `<div
  class="height-max"
>
  <div class="header" >
    <div class="titulo-content">
      <h1 class="title">
       Platform Launch
      </h1>
    </div>
    <div class="btn-add-task">
      <lib-button (click)=abrirModal() texto="Add New Task" [iconeEsquerda]="true" icone="fa-light fa-plus"></lib-button>
      <i class="fa-regular fa-ellipsis-vertical fa-xl" style="color: #828fa3;"></i>
    </div>
  </div>

  <div class="content">
    <ng-content></ng-content>
  </div>
</div>
`,
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ButtonComponent],
  providers: [ModalService]
})

export class HeaderComponent extends BaseComponent implements OnInit {
  modalService = inject(ModalService)
  constructor() {
    super()
   }

  ngOnInit() { }

  abrirModal() {
    const modal = this.modalService.open(CadEditTask, {
      width: '480px',
      clickOutside: true,
    });

    modal
    .afterClosed()
    .pipe(
      takeUntil(this.destroyed$),
      filter((data: any) => data !== false)
    )
    .subscribe((data: any) => {
 
    });
  }
}