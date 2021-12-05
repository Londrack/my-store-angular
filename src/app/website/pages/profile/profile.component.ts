import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(
    private as: AuthService,
  ) { }

  ngOnInit(): void {
    this.as.user$
    .subscribe(data => {
      this.user = data
    })
  }

}
