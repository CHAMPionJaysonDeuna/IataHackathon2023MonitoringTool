import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoginCallbackGuard } from '@ocp/ng-core';
import { LandingPageComponent, NoContentComponent } from '@ocp/ng-open-cargo-web';
import { CDMP_DISPLAY_ROUTING } from './cdmp/cdmp-security.const';

export const ROUTES: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cdmp-monitoring',
        loadChildren: () => import('./cdmp/monitoring/monitoring.module').then((m) => m.MonitoringModule),
        canLoad: [ AuthGuard ],
        data: {
            security: CDMP_DISPLAY_ROUTING
        }
    },
    {
        path: 'login/callback',
        component: NoContentComponent,
        canActivate: [LoginCallbackGuard]
    },
    {
        path: '**',
        component: NoContentComponent
    }
];

export const options: ExtraOptions = {
    useHash: true
};

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, options),
    ],
    exports: [RouterModule],
    providers: [
        AuthGuard,
        LoginCallbackGuard
    ]
})
export class AppRoutingModule {
}
