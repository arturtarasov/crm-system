import { ElementRef } from '@angular/core';

declare var M;

export class MaterialService {
    static toast(message: string) {
        M.toast({html: message});
    }

    static initializeFloatingButton(ref: ElementRef) {
        M.FloatingActionButton.init(ref.nativeElement);
    }

    static updateTextInputs() {
        M.updateTextFields();
    }
    static initmodal(ref: ElementRef): MaterialInstance {
        return M.Modal.init(ref.nativeElement);
    }
}

export interface MaterialInstance {
    open?(): void;
    close?(): void;
    destroy?(): void;
}