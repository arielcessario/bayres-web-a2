import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProductoListComponent} from './producto-list.component';
import {ProductoDetalleComponent} from './producto-detalle.component';

const routes: Routes = [
    {
        path: 'productos',
        component: ProductoListComponent
    },
    {
        path: 'producto/:id',
        component: ProductoDetalleComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ProductoRoutingModule {
}

export const routedComponents = [ProductoListComponent];