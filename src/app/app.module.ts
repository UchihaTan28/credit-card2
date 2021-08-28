import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardformComponent } from './cardform/cardform.component';
import { CardareaComponent } from './cardarea/cardarea.component';
import { FormsModule } from '@angular/forms';
import { Changes1Directive } from './changes1.directive';
import { Changes2Directive } from './changes2.directive';

@NgModule({
  declarations: [
    AppComponent,
    CardformComponent,
    CardareaComponent,
    Changes1Directive,
    Changes2Directive
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
