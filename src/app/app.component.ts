import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/user.model';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';


@Component({
  selector: 'app-root',
  template: '<router-outlet ></router-outlet>',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  showImg = true;
  token = '';
  imgRta = '';
  profile: User | null = null;

  constructor(
    private fileserv: FilesService,
    private authService: AuthService,
    private tokenService: TokenService
  ){}

  ngOnInit(){
    const token = this.tokenService.get();
    if(token){
      this.authService.profile()
      .subscribe()
    }
  }

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
