import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  failure = false;
  hide=true;
  clicked = false;
  headerColor_bk_white: boolean = false;

  
  constructor(private formBuilder:FormBuilder,private router:Router,private apiservice:LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern('[A-Za-z]*')]],
      password: ['',Validators.required]
    })
  }

  @HostListener('window:scroll', ['$event'])

onWindowScroll(e) {
  
    if (window.pageYOffset > 50) {
      this.headerColor_bk_white = true;
      
    } else {
      this.headerColor_bk_white = false;
    }
  }

  get f() { return this.loginForm.controls; }

  login(){
    // console.log(this.f.email.value, this.f.password.value)
    let user={
      username:this.f.userName.value,
      password:this.f.password.value
    }
    this.apiservice.login(user).subscribe(
      result=>{
        window.localStorage.setItem('token', result['data'].token);
        window.localStorage.setItem('name',result['data'].full_name)
        this.router.navigate(['/movies']);
        console.log(result);
      },
      error=>{
        this.failure=true
        this.clicked=false
      })

  }

  onKeydown(event) {
    if (event.keyCode ==13) {
      this.login()
    }
  }

}