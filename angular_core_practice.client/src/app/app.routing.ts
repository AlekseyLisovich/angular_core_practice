import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/account/login',
        pathMatch: 'full'
    },
    {
      path: 'account',
      loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'main',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers:[]
})
export class AppRoutingModule { }
