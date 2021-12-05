import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interfaces/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

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

  valorFinal= 0;

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.valorFinal = (this.product.taxes)
    ? this.product.price + this.product.taxes
    : this.product.price
  }

  addToCart(){
    this.addedProduct.emit(this.product)
  }

  onShowDetail(){
    this.showProduct.emit(this.product.id)
  }

}
