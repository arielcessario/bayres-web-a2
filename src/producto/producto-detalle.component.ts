import {
    Component,
    OnInit,
    ElementRef,
    ViewChild, Input, AfterViewInit
}      from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DatabaseConnectorProvider} from "../providers/database-connector.provider";
import {Producto} from "./producto.model";
import {CarritoService} from "../shared/carrito/carrito.service";

@Component({
    selector: 'producto-detalle-component',
    moduleId: module.id,
    templateUrl: 'producto-detalle.component.html'
})

/**
 * TODO:
 */
export class ProductoDetalleComponent implements OnInit {

    visible: number = 1;
    id: number;
    producto: Producto;
    data: any = {
        precios: [{0: 10}],
        cantidad: 1
    };

    constructor(private route: ActivatedRoute, private db: DatabaseConnectorProvider, private carritoService: CarritoService) {
        this.producto = new Producto(db);

        this.producto.filter$.subscribe(data=> {

            if (data.data.length == 0) {
                return;
            }
            data.data[0].cantidad = data.data[0].cantidad == undefined ? 1 : data.data[0].cantidad;
            this.data = data.data[0];
        });
    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
            this.producto.getProducto().subscribe(data=> {
                this.producto.filter('producto_id', '' + this.id, 'true');
            });
            // In a real app: dispatch action to load the details here.
        });



    }


    agregar() {
        this.carritoService.addToCarrito(this.data);
    }


}
