import {Component, OnInit} from '@angular/core';
import {CarritoService} from "../shared/carrito/carrito.service";
import {Sucursal} from "../sucursales/sucursal.model";
import {ProvinciaService} from "../provincia/provincia.service"
import {FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../usuario/usuario.model";
import {DatabaseConnectorProvider} from "../providers/database-connector.provider";

@Component({
    selector: 'carrito-component',
    moduleId: module.id,
    templateUrl: 'carrito.component.html'
})

/**
 * TODO:
 */
export class CarritoComponent implements OnInit {

    visible: number = 1;
    id: number;

    total: number;
    items: Array<any>;
    data: any = {
        precios: [{0: 0}]
    };
    sucursales: Array<any> = [];
    sucursal: number = 1;
    tipoEnvios: Array<any> = [
        {'id': 1, 'name': 'Envio a'},
        {'id': 2, 'name': 'Retira por'}
    ];
    tipoEnvio: number = 1;

    lugaresEnvio: Array<any> = [
        {'id': 1, 'name': 'Gran Buenos Aires'},
        {'id': 2, 'name': 'Capital Federal'},
        {'id': 3, 'name': 'Interior del Pais'}
    ];

    lugarEnvio: number = 1;
    provincias: Array<any> = [];

    formUsuarios: FormGroup;
    usuarios: Usuario;
    user: any = {};

    constructor(private carritoService: CarritoService, private db: DatabaseConnectorProvider) {

        this.provincias = ProvinciaService.get();
        this.usuarios = new Usuario(db);
    }

    confirmar() {

        if (this.tipoEnvio == 1 &&
            (this.formUsuarios.controls["nro"].value == 0 ||
            this.formUsuarios.controls["nro"].value == '' ||
            this.formUsuarios.controls["nro"].value == null ||
            this.formUsuarios.controls["nro"].value == undefined ||
            this.formUsuarios.controls["calle"].value == undefined ||
            this.formUsuarios.controls["calle"].value == '' ||
            this.formUsuarios.controls["calle"].value == null)) {
            console.log('error');
            return;
        }
        this.carritoService.confirmar(this.tipoEnvio, this.lugarEnvio).subscribe(response=> {
            if (response['status'] == '200') {
                this.usuarios.onSubmit(this.formUsuarios).subscribe(response=> {


                });
            }
        });
    }

    ngOnInit() {

        this.formUsuarios = this.usuarios.buildForm(this.formUsuarios);
        this.user = (JSON.parse(localStorage.getItem('currentUser'))).user;
        this.usuarios.selectItem(this.user.usuario_id, this.formUsuarios, this.user);


        Sucursal.cache.subscribe(data=> {
            if (data instanceof Array) {
                this.sucursales = data;
            }
        });

        CarritoService.data.subscribe(data=> {
            this.items = data;
        });

        CarritoService.total.subscribe(data => {
            this.total = data;
        });
    }


}
