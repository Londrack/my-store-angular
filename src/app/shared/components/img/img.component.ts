import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = ''
  @Input('img')
  set changeImg(newImg: string){
    this.img = newImg
  }
  @Input() alt:string = ''
  @Output() loaded = new EventEmitter<string>();

  imgDefault = 'https://www.m2crowd.com/core/i/placeholder.png';
  counter = 0;
  counterInterval: number | undefined;

  // CICLO DE VIDA

  constructor() {
    // before render
    // Nada asincrono
    // solo corre una vez
    // console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges){
    // before & during render
    // se ejecuta cada vez que se actualicen los inputs
    // console.log('ngOnChanges', 'changes =>', changes);
  }

  ngOnInit(): void {
    // before render
    // async - fetch
    // solo corre una vez
    // console.log('ngOnInit', 'imgValue =>', this.img);

    // this.counterInterval = window.setInterval(()=>{
    //   this.counter += 1
    //   console.log('run counter');
    // }, 1000)
  }

  ngAfterViewInit(){
    // after render
    // maneja hijos
    // console.log('ngAfterViewInit');
  }

  ngOnDestroy(){
    // delete
    // console.log('ngOnDestroy');
    // window.clearInterval(this.counterInterval)
  }

  // fin CICLO

  imgError(){
    this.img = this.imgDefault
  }

  imgLoaded(){
    this.loaded.emit(this.img);
  }

}
