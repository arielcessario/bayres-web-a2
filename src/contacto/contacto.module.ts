import {NgModule, Input}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {ReactiveFormsModule, FormsModule}    from '@angular/forms';

import {ContactoComponent} from './contacto.component'
import {SharedModule} from '../shared/shared.module'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        ContactoComponent
    ],
    exports: [ContactoComponent],
    providers: []
})
export class ContactoModule {

}