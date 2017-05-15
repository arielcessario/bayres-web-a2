import {Component, OnInit} from '@angular/core';

import {Producto} from './producto/producto.model';
import {DatabaseConnectorProvider} from './providers/database-connector.provider';
import {LoginMessageService} from "./shared/login/login-message.service";
import {CarritoService} from "./shared/carrito/carrito.service";
import {Sucursal} from "./sucursales/sucursal.model";

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    sucursal: Sucursal;
    producto: Producto;
    showLogin: boolean = false;


    ngOnInit() {
    }

    constructor(private db: DatabaseConnectorProvider, private loginMessageService: LoginMessageService,
    carritoService: CarritoService) {

        this.producto = new Producto(db);
        this.producto.init();

        this.sucursal = new Sucursal(db);
        this.sucursal.init();


        this.loginMessageService.loginService().subscribe(data=> {
            this.showLogin = data.message == 'show';
        })


    }


}

