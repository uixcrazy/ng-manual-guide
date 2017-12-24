import {NgModule, ModuleWithProviders} from '@angular/core';

import {NgbTooltipModule} from './tooltip/tooltip.module';

export {NgbTooltipModule, NgbTooltipConfig, NgbTooltip} from './tooltip/tooltip.module';

export {Placement} from './tooltip/positioning';

const NGB_MODULES = [ NgbTooltipModule ];

@NgModule({
  imports: [ NgbTooltipModule.forRoot() ],
  exports: NGB_MODULES
})
export class NgbRootModule { }

@NgModule({imports: NGB_MODULES, exports: NGB_MODULES})
export class NgbModule {
  static forRoot(): ModuleWithProviders { return {ngModule: NgbRootModule}; }
}
