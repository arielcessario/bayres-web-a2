import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PrincipalComponent}   from './principal/principal.component';
import {ProductoListComponent}   from './producto/producto-list.component';
import {ProductoDetalleComponent}   from './producto/producto-detalle.component';
import {AuthGuard} from "./core/auth-guard.service";
import {CarritoComponent} from "./carrito/carrito.component";
import {UsuarioComponent} from "./usuario/usuario.component";
import {ContactoComponent} from "./contacto/contacto.component";

const routes: Routes = [
    {path: '', redirectTo: 'principal', pathMatch: 'full'},
    {path: 'principal', component: PrincipalComponent},
    {path: 'productos', component: ProductoListComponent},
    {path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard]},
    {path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]},
    {path: 'producto/:id', component: ProductoDetalleComponent},
    {path: 'contacto', component: ContactoComponent},
    // {path: 'propiedades', component: PropiedadComponent},
    // { path: 'detail/:id', component: HeroDetailComponent },
    // { path: 'heroes',     component: HeroesComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class Routing {
}
// export const routedComponents = [MonedaComponent];