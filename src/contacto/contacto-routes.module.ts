import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ContactoComponent} from './contacto.component';

const routes: Routes = [
    {
        path: 'contacto',
        component: ContactoComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ContactoRoutingModule {
}

export const routedComponents = [ContactoComponent];