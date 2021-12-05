import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { LayoutComponent } from './components/layout/layout.component';

import { QuicklinkModule} from 'ngx-quicklink'

import { SharedModule } from '../shared/shared.module';

import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Pagination } from "swiper";

SwiperCore.use([Pagination]);

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    LoginComponent,
    RecoveryComponent,
    ProfileComponent,
    MycartComponent,
    RegisterComponent,
    FooterComponent,
    ProductPageComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule,
    QuicklinkModule
  ]
})
export class WebsiteModule { }
