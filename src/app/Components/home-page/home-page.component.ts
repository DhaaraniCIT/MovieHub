import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  headerColor_bk_white=false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])

onWindowScroll(e) {
  
    if (window.pageYOffset > 50) {
      this.headerColor_bk_white = true;
      
    } else {
      this.headerColor_bk_white = false;
    }
  }

}
