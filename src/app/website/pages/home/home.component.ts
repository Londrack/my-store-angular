import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  template: `<app-products-list
      [products]="products"
      (loadMore)="loadMore()"
      [loadBtn]="loadBtn"
      [productID]="productID"
    ></app-products-list>`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 20;
  offset = 0;
  loadBtn = false;
  productID: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loadMore();
    this.route.queryParamMap.subscribe(params =>{
      this.productID = params.get('product');
    })
  }

  loadMore(){
    this.productsService.getByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      if(data.length == this.limit){
        this.offset += (this.limit / 2);
        this.loadBtn = true;
      }else{
        this.loadBtn = false;
      }
    })
  }

}
