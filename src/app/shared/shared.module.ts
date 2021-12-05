import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Pagination } from "swiper";

SwiperCore.use([Pagination]);

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsListComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports:[
    ImgComponent,
    ProductComponent,
    ProductsListComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ProductDetailComponent,
  ]
})
export class SharedModule { }
