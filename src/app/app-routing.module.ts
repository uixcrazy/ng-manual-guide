import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'manual-guide',
    loadChildren: './manual-guide/manual-guide.module#ManualGuideModule'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: './base/base.module#BaseModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true
    })
  ],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
