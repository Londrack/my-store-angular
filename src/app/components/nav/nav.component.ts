import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { Product } from 'src/app/interfaces/product.model';
import { User } from 'src/app/interfaces/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  myCart: Product[] = [];
  activeMenu = false;

  profile: User = {
    id: '',
    email: '',
    password: '',
    name: ''
  }

  visitante = {
    name: 'Visitante',
    email: 'visitante@mail.com',
    password: '1212'
  }

  createdUser = true;

  constructor(
    private storeService: StoreService,
    private auth: AuthService,
    private user: UsersService
  ) {
    this.myCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  createUser(){
    this.createdUser = !this.createdUser;
    this.user.create(this.visitante)
    .subscribe(rta => {
      Swal.fire({
        title: 'Usuario creado',
        text: `Bienvenido ${this.visitante.name}`,
        icon: 'success',
        confirmButtonText: 'Super!'
      })
    })
  }

  login() {
    this.auth.login('visitante@mail.com', '1212')
    .pipe(
      switchMap(() => {
        return this.auth.profile();
      })
    )
    .subscribe(user => {
      this.profile = user;
    }, err => {
      this.createdUser = !this.createdUser;
      Swal.fire({
        title: err.error.statusCode,
        text: err.error.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    });
  }


}
