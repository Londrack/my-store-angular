import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  productId: string | null = null;
  product: Product = {
    id: '',
    images: [],
    title: '',
    price: 0,
    description: '',
    category: {
      id: '',
      name: '',
    }
  }

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get('id');

        if (this.productId){
          return this.productsService.getOne(this.productId);
        }
        return [];
        })
      )
      .subscribe(data => {
        this.product = data;
        console.log(data)
      });

  }

  goToBack(){
    this.location.back();
  }

}
