import {NgModule, Input}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms';

import {CarritoComponent}    from './carrito.component';
import {SharedModule} from '../shared/shared.module'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        CarritoComponent
    ],
    exports: [CarritoComponent],
    providers: []
})
export class CarritoModule {

}