import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { OcpConfigurationService, OcpHttpModule } from '@ocp/ng-core';
import { NotificationModule } from '@ocp/ng-core/notifications';
import {
    BusyIndicatorModule,
    CanDeactivateFormService,
    LandingPageModule,
    LocationIconClassService,
    OcpAccessRightRequiredModule,
    OcpNoContentModule,
    OcpPipesModule,
    OcpPortalMenuService,
    PortalModule
} from '@ocp/ng-open-cargo-web';
import 'primeicons/primeicons.css';
import { ConfirmDialogModule, SharedModule } from 'primeng/primeng';
import 'primeng/resources/primeng.min.css';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// CSS
/*
* Platform and Environment providers/directives/pipes
*/
// App is our top level component
const APP_PROVIDERS = [
    OcpPortalMenuService
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent
    ],
    /**
     * Import Angular's modules.
     */
    imports: [
        BrowserModule,
        RouterModule,
        CommonModule,
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        PortalModule.forRoot(),
        NotificationModule.forRoot(),
        OcpHttpModule.forRoot(),
        BusyIndicatorModule,
        ConfirmDialogModule,
        OcpPipesModule,
        LandingPageModule,
        OcpNoContentModule,
        OcpAccessRightRequiredModule
        /**
         * This section will import the `DevModuleModule` only in certain build types.
         * When the module is not imported it will get tree shaked.
         * This is a simple example, a big app should probably implement some logic
         */
        // ...environment.showDevModule ? [ DevModuleModule ] : [],
    ],
    /**
     * Expose our Services and Providers into Angular's dependency injection.
     */
    providers: [
        environment.ENV_PROVIDERS,
        APP_PROVIDERS,
        {provide: 'window', useFactory: getWindow},
        OcpConfigurationService,
        LocationIconClassService,
        CanDeactivateFormService
    ]
})
export class AppModule {
}

export function getWindow() {
    return window;
}
