import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Category, Product } from 'src/app/interfaces/product.model';
import { User } from 'src/app/interfaces/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
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
  scrolled = false;
  token: string | null = null;

  profile: User  | null = null;

  // visitante = {
  //   name: 'Visitante',
  //   email: 'visitante@mail.com',
  //   password: '1212',
  //   role: 'customer'
  // }

  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private auth: AuthService,
    private user: UsersService,
    private categoryService: CategoriesService,
    private router: Router
  ) {
    this.myCart = this.storeService.getShoppingCart();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
      this.scrolled = window.scrollY > 0;
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.token = localStorage.getItem('token');
    this.auth.user$
    .subscribe(data => {
      this.profile = data
    })
    // if(this.token){
    //   const profileString = localStorage.getItem('profile');
    //   if(profileString){
    //     this.profile = JSON.parse(profileString)
    //   }
    // }
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }


  login() {

    let userName = '';
    let userPass = '';

    Swal.fire({
      title: 'What kind of user do you want?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Customer',
      denyButtonText: `Admin`,
    }).then((result) => {
      if (result.isConfirmed) {
        userName = 'john@mail.com';
        userPass = 'changeme';
      } else if (result.isDenied) {
        userName = 'admin@mail.com';
        userPass = 'admin123';
      }
    }).then(() => {
      this.auth.login(userName, userPass)
        .pipe(
          switchMap(() => {
            return this.auth.profile();
          })
        )
        .subscribe(() => {
          this.router.navigate(['/profile']);
        });
    })
  }

  logout(){
    this.auth.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

  getAllCategories(){
    this.categoryService.getAll()
    .subscribe(data => {
        this.categories = data;
      }
    )
  }

}
