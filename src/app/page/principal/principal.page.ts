import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private firebase:FirebaseService, private router:Router) { }

  ngOnInit() {
  }

  async logout(){
    await this.firebase.logout();
    this.router.navigateByUrl("login");

  }

}
