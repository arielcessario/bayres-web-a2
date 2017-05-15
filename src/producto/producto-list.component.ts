import {
    Component,
    OnInit,
    ElementRef,
    ViewChild, Input, AfterViewInit
}      from '@angular/core';
import {Router} from '@angular/router';
import {Producto} from "./producto.model";
import {DatabaseConnectorProvider} from "../providers/database-connector.provider";

@Component({
    selector: 'producto-list-component',
    moduleId: module.id,
    templateUrl: 'producto-list.component.html'
})

/**
 * TODO:
 */
export class ProductoListComponent implements OnInit {

    data: Array<any> = [];
    producto: Producto;

    constructor(private router: Router, private db: DatabaseConnectorProvider) {
        this.producto = new Producto(db);
    }


    ngOnInit() {
        this.producto.get({'function': 'getProductos'}).subscribe(data=> {
            this.data = data;
        })
    }

    goTo(id): void {
        // console.log('entra');
        // let link = ['/detail', hero.id];
        this.router.navigate(['/producto', id]);
    }


}
