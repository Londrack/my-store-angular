import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, UpdateProductDTO } from 'src/app/interfaces/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product = {
    id: '',
    images: [],
    title: '',
    price: 0,
    description: '',
    category: {
      id: '',
      name: '',
    }
  };
  @Output() productUpdated = new EventEmitter<Product>();
  @Output() productDeleted = new EventEmitter<string>();

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
  }

  updateProduct(id: string){
    const changes: UpdateProductDTO = {
      title: 'Producto Editado v2'
    };
    this.productsService.update(id, changes)
    .subscribe(data=>{
      this.product = data;
      this.productUpdated.emit(this.product);
    })
  }

  deleteProduct(){
    const id = this.product.id;
    this.productsService.delete(id)
    .subscribe(data=>{
      this.productDeleted.emit(id)
    })
  }

}
