import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, Injector } from "@angular/core";
import { filter, takeUntil } from 'rxjs';
import { BaseComponent } from '../base.component';
import { DialogRef } from './modal-ref';
import { ModalConfig } from './modal.model';
import { DIALOG_DATA } from './modal.tokens';

@Injectable()
export class ModalService extends BaseComponent {
  constructor(private overlay: Overlay, private injector: Injector) {
    super();
  }

  open<T>(component: ComponentType<T>, config?: ModalConfig): DialogRef {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
      width: config?.width,
      height: config?.heigth,
    });

    const dialogRef = new DialogRef(overlayRef);

    const injector = Injector.create({
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
    });

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    overlayRef
      .backdropClick()
      .pipe(
        takeUntil(this.destroyed$),
        filter((v: any) => config?.clickOutside == true)
      )
      .subscribe((response: any) => dialogRef.close());

    return dialogRef;
  }
}
