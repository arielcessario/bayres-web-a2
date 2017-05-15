import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PrincipalComponent} from './principal.component';

const routes: Routes = [
    {
        path: 'principal',
        component: PrincipalComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MonedaRoutingModule {
}

export const routedComponents = [PrincipalComponent];