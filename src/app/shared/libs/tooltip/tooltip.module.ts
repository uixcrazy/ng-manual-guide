import {NgModule, ModuleWithProviders} from '@angular/core';

import {NgbTooltip, NgbTooltipWindow} from './tooltip';
import {NgbTooltipConfig} from './tooltip-config';
import {Placement} from '../tooltip/positioning';

export {NgbTooltipConfig} from './tooltip-config';
export {NgbTooltip} from './tooltip';
export {Placement} from '../tooltip/positioning';

@NgModule({declarations: [NgbTooltip, NgbTooltipWindow], exports: [NgbTooltip], entryComponents: [NgbTooltipWindow]})
export class NgbTooltipModule {
  static forRoot(): ModuleWithProviders { return {ngModule: NgbTooltipModule, providers: [NgbTooltipConfig]}; }
}
