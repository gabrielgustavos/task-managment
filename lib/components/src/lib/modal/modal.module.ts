import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { ModalService } from '.';

@NgModule({
  imports: [OverlayModule],
  exports: [OverlayModule],
  providers: [ModalService],
})
export class ModalModule {}
