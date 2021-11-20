import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product } from 'src/app/interfaces/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators'
import { zip } from 'rxjs'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  showProductDetail = false;
  products: Product[] = []
  productChosen: Product = {
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

  limit = 20;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.loadMore()
  }

  onAddToCart(product: Product){
    this.storeService.addProduct(product)
  }

  togglesShowProduc(){
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id:string){
    this.statusDetail = 'loading';
    this.showProductDetail = true
    this.productsService.getOne(id)
    .subscribe(data=>{
      this.productChosen = data;
    }, errorMsg => {
      this.statusDetail = 'error'
      Swal.fire({
        title: errorMsg,
        text: errorMsg,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    })
  }

  onUpdatedProduct(data:Product){
    const productIndex = this.products.findIndex(item => item.id === data.id)
    this.products[productIndex] = data;
  }

  onDeletedProduct(id:string){
    this.showProductDetail = false
    const productIndex = this.products.findIndex(item => item.id === id)
    this.products.splice(productIndex, 1);
  }

  createNewProduct(){
    const newPto: CreateProductDTO = {
      title: 'Nuevo producto genial',
      price: 100,
      description: 'Este es un producto genial que estoy agregando de prueba',
      categoryId: 3,
      images: [
        'https://picsum.photos/640',
        'https://picsum.photos/640'
      ]

    }
    this.productsService.create(newPto)
    .subscribe(data=>{
      this.products.unshift(data)
    })
  }

  loadMore(){
    this.productsService.getByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += (this.limit / 2)
    })
  }

  readAndUpdate(id: string){
    //para dependencias
    this.productsService.getOne(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'change'}))
    )
    .subscribe(data => {
      console.log(data)
    });

    //para ejecutar dos al tiempo
    zip(
      this.productsService.getOne(id),
      this.productsService.update(id, {title: 'change'})
    )
    .subscribe(response => {
      console.log('read', response[0]);
      console.log('update', response[1]);
    })
  }
}
