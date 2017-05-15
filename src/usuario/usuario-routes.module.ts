import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UsuarioComponent} from './usuario.component';

const routes: Routes = [
    {
        path: 'usuario',
        component: UsuarioComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {
}

export const routedComponents = [UsuarioComponent];