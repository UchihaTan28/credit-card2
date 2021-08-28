import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appChanges2]'
})
export class Changes2Directive {

    constructor(
        private viewCont: ViewContainerRef,
        private tempRef: TemplateRef<any>
    ) { }
    private currentValue: any;
    private hasView = false;
    @Input() set appChanges2(val: any) {
        if (val !== this.currentValue && (!this.currentValue || !val)) {
            this.viewCont.clear();
            this.viewCont.createEmbeddedView(this.tempRef);
            this.currentValue = val;
        }
         else if (!this.hasView) {
            this.viewCont.createEmbeddedView(this.tempRef);
            this.hasView = true;
            this.currentValue = val;
        } 
    }

}
