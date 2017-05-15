import {NgModule, Input}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {ReactiveFormsModule, FormsModule}    from '@angular/forms';

import {ProductoComponent}    from './producto.component';
import {ProductoListComponent}    from './producto-list.component';
import {ProductoDetalleComponent}    from './producto-detalle.component';
import {SharedModule} from '../shared/shared.module'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        ProductoComponent, ProductoListComponent, ProductoDetalleComponent
    ],
    exports: [ProductoComponent, ProductoListComponent, ProductoDetalleComponent],
    providers: []
})
export class ProductoModule {

}