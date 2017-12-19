import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ManualGuideComponent } from './manual-guide.component';
import { ManualGuideRoutingModule } from './manual-guide-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ManualGuideRoutingModule,
  ],
  declarations: [
    ManualGuideComponent,
  ],
  providers: [ ],
  exports: []
})

export class ManualGuideModule { }
