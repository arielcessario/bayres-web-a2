import{Component, OnInit} from '@angular/core';
import {Producto} from "../producto/producto.model";
import {DatabaseConnectorProvider} from '../providers/database-connector.provider';

@Component({
    moduleId: module.id,
    templateUrl: 'principal.component.html'
})
export class PrincipalComponent implements OnInit {


    private producto: Producto;
    private ofertas: Array<any>;
    private destacados: Array<any>;

    constructor(private db: DatabaseConnectorProvider) {
        this.producto = new Producto(db);
        this.producto.filter$.subscribe(data=> {
            if (data.obj == 'en_oferta') {
                this.ofertas = data.data;
            }

            if (data.obj == 'destacado') {
                this.destacados = data.data;
            }


        });


        this.producto.get({'function': 'getProductos'}).subscribe(data=> {
            this.producto.filter('en_oferta', '1', 'true');
            this.producto.filter('destacado', '1', 'true');

        })
    }

    ngOnInit() {
    }
}
