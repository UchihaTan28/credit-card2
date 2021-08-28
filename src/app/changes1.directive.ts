import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appChanges1]'
})
export class Changes1Directive {
  
  constructor(
      private viewCont: ViewContainerRef,
      private tempRef: TemplateRef<any>
  ) { }
  private currentValue: any;
  private hasView = false;

  @Input() set appChanges1(val: any) {
    if (val !== this.currentValue) {
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
