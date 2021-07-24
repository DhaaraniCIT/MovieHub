import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../login/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token: string;
  name: string;
  is_movies=false;
  
  constructor(private apiservice:LoginService,private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.name = localStorage.getItem('name')
    this.name = (this.name == 'null' ? 'MovieHub' : this.name)
    // if(this.token){
    //   this.picture()
    // }
    var url = this.router.url;
    var href=url.split("/").pop();
    this.is_movies = (href == 'movies')? true : false
    // console.log(this.is_movies)
  }
  logout(){
    localStorage.clear();
  }
  picture(){
    
    this.apiservice.getAvater(this.name).subscribe(
      result=>{
        // this.pic = result;
        console.log(result);
      }
    )
  }
}
