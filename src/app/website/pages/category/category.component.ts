import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  template: `<app-products-list
      [products]="products"
      (loadMore)="loadMore()"
      [loadBtn]="loadBtn"
      [productID]="productID"
    ></app-products-list>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  products: Product[] = [];
  categoryId: string | null = null;
  limit = 20;
  offset = 0;
  loadBtn = false;
  productID: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params =>{
      this.productID = params.get('product');
    })

    this.route.paramMap
    .subscribe(params => {
        if(this.categoryId !== params.get('id')){
          this.offset = 0;
          this.products = [];
        }
        this.categoryId = params.get('id');
        this.loadMore();
    })

    // this.route.paramMap
    // .pipe(
    //   switchMap(params => {
    //     if(this.categoryId !== params.get('id')){
    //       this.offset = 0;
    //     }
    //     this.categoryId = params.get('id');

    //     if (this.categoryId){
    //       return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
    //     }
    //     return [];
    //     })
    //   )
    //   .subscribe(data => {
    //     this.products = data
    //   });
  }

  loadMore(){
    if (this.categoryId){
      this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
      .subscribe(
        data => {
          this.products = this.products.concat(data);
          if(data.length === this.limit){
            this.offset += (this.limit);
            this.loadBtn = true;
          }else{
            this.loadBtn = false
          }
        }
      )
    }
  }

}
