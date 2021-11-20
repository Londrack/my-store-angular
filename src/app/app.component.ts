import { Component } from '@angular/core';
import { User } from './interfaces/user.model';
import { FilesService } from './services/files.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  showImg = true;
  token = '';
  imgRta = '';
  profile: User = {
    id: '',
    email: '',
    password: '',
    name: ''
  }

  constructor(
    private fileserv: FilesService
  ){}

  imgParent = 'https://picsum.photos/500';

  onLoaded(img:string){
    console.log('log padre', img)
  }

  toggleShowImg(){
    this.showImg = !this.showImg
  }

  // educativo
  downloadPDF(){
    this.fileserv.get('myPdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0)
    if(file) {
      this.fileserv.upload(file)
      .subscribe(rta =>{
          this.imgRta = rta.location;
      })
    }
  }


}
