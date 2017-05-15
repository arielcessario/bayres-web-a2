import {NgModule}            from '@angular/core';
import {ReactiveFormsModule}        from '@angular/forms';
import {BrowserModule}    from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import{Routing} from './app.routes';
import {AppComponent}    from './app.component';
import {CoreModule}    from './core/core.module';
import {PrincipalModule}    from './principal/principal.module';
import {ProductoModule}    from './producto/producto.module';
import {CarritoModule}    from './carrito/carrito.module';
import {UsuarioModule}    from './usuario/usuario.module';
import {ContactoModule}    from './contacto/contacto.module';

import {PaginationService} from "./shared/pagination/pagination.service";
import {CacheService} from "./core/services/cache.service";
import {DatabaseConnectorProvider} from "./providers/database-connector.provider";
import {AuthenticationService} from "./core/authentication.service";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        Routing,
        CoreModule,
        PrincipalModule,
        ProductoModule,
        CarritoModule,
        UsuarioModule,
        ContactoModule,
        HttpModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [PaginationService,
        CacheService,
        DatabaseConnectorProvider,
        AuthenticationService]

})
export class AppModule {
}