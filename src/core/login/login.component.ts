import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";

import {Login} from "./login.model"
import {DatabaseConnectorProvider} from "../../providers/database-connector.provider";
import {AuthenticationService} from "../authentication.service";
import {LoginMessageService} from "../../shared/login/login-message.service";
import {Http} from "@angular/http";
import {Usuario} from "../../usuario/usuario.model";
@Component({
    selector: 'login-component',
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

/**
 * TODO:
 */
export class LoginComponent implements OnInit, AfterViewInit {
    formLogin: FormGroup;
    formCreateUsuario: FormGroup;
    private fb: FormBuilder;
    private login: Login;
    current: number = 1;
    usuario: Usuario;

    private authService: AuthenticationService;

    @ViewChild('pwSignIn') el: ElementRef;

    constructor(private db: DatabaseConnectorProvider, private http: Http, private loginMessageService: LoginMessageService) {
        this.loginMessageService.loginService().subscribe(data=> {
            // console.log(data);
        });

        this.usuario = new Usuario(db);

    }


    ngOnInit() {
        this.login = new Login(this.db);
        this.formLogin = this.login.buildForm(this.formLogin);
        this.authService = new AuthenticationService(this.http);


        this.formCreateUsuario = this.usuario.buildForm(this.formCreateUsuario);


    }

    ngAfterViewInit() {

    }

    create(){
        this.usuario.onSubmit(this.formCreateUsuario, true).subscribe(response=>{
            if(response.status == '200'){
                this.authService.login(this.formCreateUsuario.get('mail').value, this.formCreateUsuario.get('password').value)
                    .subscribe(data => {
                        this.loginMessageService.loginIn();
                    });
            }
        })
    }

    fnLogin() {
        if (!this.formLogin.valid) {
            return;
        }

        this.authService.login(this.formLogin.get('mail').value, this.formLogin.get('password').value)
            .subscribe(data => {
                this.loginMessageService.loginIn();
            });
    }

    show() {

        this.el.nativeElement.type = this.el.nativeElement.type == 'text' ? 'password' : 'text';
    }

    close(){
        this.loginMessageService.hideLogin();
    }

    getDeseos(){

    }


}
