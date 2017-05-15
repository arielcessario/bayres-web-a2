import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {ReactiveFormsModule}        from '@angular/forms';

import {NavComponent}    from './nav.component';
import {WaitingComponent}    from './waiting.component';
import {FooterComponent}    from './footer/footer.component';
import {LoginComponent} from "./login/login.component";

import {AuthGuard} from './auth-guard.service'
import {AuthenticationService} from './authentication.service'
import {CacheService} from './services/cache.service'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        NavComponent,
        WaitingComponent,
        FooterComponent,
        LoginComponent
    ],
    exports: [
        NavComponent,
        WaitingComponent,
        FooterComponent,
        LoginComponent
    ],
    providers: [
        CacheService,
        AuthGuard,
        AuthenticationService,
    ]
})
export class CoreModule {
}
