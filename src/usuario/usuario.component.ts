import {
    Component,
    OnInit,
    ElementRef,
    ViewChild, Input, AfterViewInit
}      from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Usuario} from "./usuario.model";
import {DatabaseConnectorProvider} from "../providers/database-connector.provider";

@Component({
    selector: 'usuario-component',
    moduleId: module.id,
    templateUrl: 'usuario.component.html'
})

/**
 * TODO:
 */
export class UsuarioComponent implements OnInit {
    formUsuarios: FormGroup;
    usuarios: Usuario;
    user: any = {};

    constructor(private db: DatabaseConnectorProvider) {
        this.usuarios = new Usuario(db);
    }


    ngOnInit() {
        this.formUsuarios = this.usuarios.buildForm(this.formUsuarios);
        this.user = (JSON.parse(localStorage.getItem('currentUser'))).user;
        this.usuarios.selectItem(this.user.usuario_id, this.formUsuarios, this.user);

    }



}
