import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {ReactiveFormsModule}    from '@angular/forms';

import {PrincipalComponent}    from './principal.component';
import {SharedModule} from '../shared/shared.module'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        PrincipalComponent
    ],
    exports: [PrincipalComponent],
    providers: []
})
export class PrincipalModule {
}