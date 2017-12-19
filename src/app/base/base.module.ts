import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';

import { BaseComponent } from './base.component';
import { BaseRoutingModule } from './base-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    BaseRoutingModule,
    // NgbTooltipModule.forRoot(),
    // NgbAccordionModule.forRoot(),
  ],
  declarations: [
    BaseComponent,
    HomeComponent
  ],
  // entryComponents: [ ],
  providers: [ ]
})

export class BaseModule { }
