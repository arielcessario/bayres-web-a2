// Snapshot version
// #docregion
import {Component, OnInit}      from '@angular/core';
import {Router} from '@angular/router';
import {style, animate, state, transition, trigger} from "@angular/animations";
import {LoginMessageService} from "../shared/login/login-message.service";
import {AuthenticationService} from "./authentication.service";
import {CarritoService} from "../shared/carrito/carrito.service";
// import { Hero, HeroService } from './hero.service';


@Component({
    selector: 'nav-component',
    templateUrl: 'nav.component.html',
    moduleId: module.id,
    animations: [
        trigger('visibility', [
            state('true', style({
                opacity: 1,
                visibility: 'visible'
            })),
            state('false', style({
                opacity: 0,
                visibility: 'collapse'
            })),
            transition('* => *', animate('.3s'))
        ])
    ]
})
export class NavComponent implements OnInit {
    // hero: Hero;

    routes: string[];
    titulo: string = '';
    visibility: string = 'false';
    overUserHeader: boolean = false;
    overUserMenu: boolean = false;
    loged: boolean = false;
    total: number = 0;


    constructor(private router: Router, private loginMessageService: LoginMessageService, private authenticationService: AuthenticationService) {
        this.routes = ['monedas', 'propiedades', 'comodidades', 'servicios', 'principal'];

        this.router.events.subscribe(data=> {
            this.titulo = data['url'].replace('/', '');
        });

        if (localStorage.getItem('currentUser')) {
            this.loged = true;
        }

        loginMessageService.loginService().subscribe(data=> {
            this.loged = data.loged;
        });

        CarritoService.total.subscribe(data => {
            this.total = data;
        });

    }

    login() {
        this.loginMessageService.showLogin();
    }

    isSelected(path) {
        // if(path === this.location.path()){
        //     return true;
        // }
        // else if(path.length > 0){
        //     return this.location.path().indexOf(path) > -1;
        // }
    }

    goTo(link): void {
        // console.log('entra');
        // let link = ['/detail', hero.id];
        LoginMessageService.to = link;
        this.router.navigate([link]);
    }

    ngOnInit() {
        // (+) converts string 'id' to a number
        // let id = +this.route.snapshot.params['id'];

        // this.service.getHero(id)
        //     .then((hero: Hero) => this.hero = hero);
    }

    overUser() {
        this.visibility = 'true';
    }

    logOut() {
        this.authenticationService.logout();
        this.router.navigate(['/principal']);
        this.loged = false;
    }

}
