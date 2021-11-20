import { Component } from '@angular/core';
import { User } from './interfaces/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  showImg = true;
  token = '';
  profile: User = {
    id: '',
    email: '',
    password: '',
    name: ''
  }

  constructor(){}

  imgParent = 'https://picsum.photos/500';

  onLoaded(img:string){
    console.log('log padre', img)
  }

  toggleShowImg(){
    this.showImg = !this.showImg
  }

}
