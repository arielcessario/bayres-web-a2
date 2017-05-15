import {NgModule, Input}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {ReactiveFormsModule, FormsModule}    from '@angular/forms';

import {UsuarioComponent}    from './usuario.component';
import {SharedModule} from '../shared/shared.module'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        UsuarioComponent
    ],
    exports: [UsuarioComponent],
    providers: []
})
export class UsuarioModule {

}