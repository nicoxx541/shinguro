import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-testapi',
  templateUrl: './testapi.page.html',
  styleUrls: ['./testapi.page.scss'],
})
export class TestapiPage implements OnInit {

  constructor(private api:ApiService) { 

    this.api.getPosts().subscribe((res)=>{
      console.log(res);
    },(error)=>{
      console.log(error);
    });

  }

  ngOnInit() {
  }
}
