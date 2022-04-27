import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email :new FormControl(null,[Validators.required,Validators.email]),
    password :new FormControl(null,[Validators.minLength(6), Validators.maxLength(20)]),
  })

  //injection de dependency
  constructor(
        private authService: AuthService ,
        private tokenService : TokenService ,
        private accountService :AccountService,
        private router : Router) { }

  ngOnInit(): void {
  }

  login(){

    //this.authService.login(this.loginForm.value).subscribe(res=> console.log(res));

    this.authService.login(this.loginForm.value).subscribe(res=> this.handelResponse(res))

    
  }

  //localstorage
  handelResponse(res :any) {
    this.tokenService.handle(res)
    this.accountService.changeStatus(true);
    this.router.navigateByUrl("/house")
  }

}
