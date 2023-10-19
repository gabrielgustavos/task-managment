import { Directive } from "@angular/core";
import { BaseComponent } from "../base.component";
import { DialogRef } from "./modal-ref";

@Directive()
export abstract class ModalComponent extends BaseComponent {

    /**
     *
     */
    constructor(public dialogRef: DialogRef) {
        super()
    }

    confirmar(): void {
        this.dialogRef.close(true);
    }

    cancel(): void {
        this.dialogRef.close(false);
    }
}