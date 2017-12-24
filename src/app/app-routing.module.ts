import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {
  //   path: 'manual-guide',
  //   loadChildren: './manual-guide/manual-guide.module#ManualGuideModule'
  // },
  // { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   loadChildren: './base/base.module#BaseModule',
  // },

  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './base/base.module#BaseModule'
      },
      {
        path: 'manual-guide',
        loadChildren: './manual-guide/manual-guide.module#ManualGuideModule'
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true
    })
  ],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
