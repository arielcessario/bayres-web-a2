import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs/Rx";
import {Producto} from "../../producto/producto.model";
import {DatabaseConnectorProvider} from "../../providers/database-connector.provider";
import {ProvinciaService} from "../../provincia/provincia.service";

@Injectable()
export class CarritoService implements OnInit {

    static carrito: any = {};
    producto: Producto;
    static data: BehaviorSubject<any> = new BehaviorSubject({});
    static total: BehaviorSubject<number> = new BehaviorSubject(0);
    static cart: Array<any> = [];
    static vTotal: number = 0.0;

    ngOnInit() {


    }

    constructor(protected fireCache: DatabaseConnectorProvider) {

        let temp = [];
        CarritoService.cart = [];
        Producto.cache.subscribe(data=> {
            if (localStorage.getItem('carritoBayres')) {
                temp = JSON.parse(localStorage.getItem('carritoBayres'));
                CarritoService.carrito = temp;
                for (var i in data) {
                    if (temp[data[i].producto_id] != undefined) {
                        data[i].cantidad = temp[data[i].producto_id];
                        data[i].en_carrito = true;
                        CarritoService.cart.push(data[i]);
                    }
                }
            }
            CarritoService.data.next(CarritoService.cart);
            this.calcularTotal();
        });
    }

    updateCarrito(item) {
        if (!item.en_carrito) {
            return;
        }

        if (CarritoService.carrito[item.producto_id] == undefined) {
            CarritoService.carrito[item.producto_id] = {};
        }

        CarritoService.carrito[item.producto_id] = item.cantidad;

        localStorage.setItem('carritoBayres', JSON.stringify(CarritoService.carrito));
        this.calcularTotal();
    }


    // TODO: Duplica los que tienen mismo id
    addToCarrito(item) {

        if (CarritoService.carrito[item.producto_id] == undefined) {
            CarritoService.carrito[item.producto_id] = {};
        }

        CarritoService.carrito[item.producto_id] = item.cantidad;
        item.en_carrito = true;

        localStorage.setItem('carritoBayres', JSON.stringify(CarritoService.carrito));

        CarritoService.cart.push(item);
        CarritoService.data.next(CarritoService.cart);

        this.calcularTotal();
    }

    removeFromCarrito(item) {
        delete CarritoService.carrito[item.producto_id];
        localStorage.setItem('carritoBayres', JSON.stringify(CarritoService.carrito));
        delete item['en_carrtito'];
        item.cantidad = 1;
        CarritoService.cart.splice(CarritoService.cart.indexOf(item), 1);
        CarritoService.data.next(CarritoService.cart);

        this.calcularTotal();
    }

    confirmar(origen, destino) {

        for (var i in CarritoService.cart) {
            CarritoService.cart[i]['precio_unitario'] = CarritoService.cart[i]['precios'][0]['precio'];
        }

        let pedido = {
            total: CarritoService.vTotal,
            usuario_id: 1,
            origen: origen,
            destino: destino,
            detalles: CarritoService.cart
        };


        let obj = {
            'function': 'createCarrito',
            'carrito': pedido
        };

        return this.fireCache.create(obj, 'producto');
    }


    calcularTotal() {

        let total = 0;
        for (var i in CarritoService.cart) {
            total += (CarritoService.cart[i].precios[0].precio * CarritoService.cart[i].cantidad);
        }
        CarritoService.vTotal = total;
        CarritoService.total.next(total);
    }
}