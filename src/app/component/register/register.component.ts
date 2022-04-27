import { Router } from '@angular/router';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users : User [] = [];  
  user : User = {}
  
  constructor(private router : Router, private userService: UserService) { }

  ngOnInit(): void {
  }


  onRegister(){
        this.userService.create(this.user)
        .subscribe(response => console.log(response))
      
      //   .subscribe(() => {
      //   this.users.unshift(this.user); // ajouter en premier
      //   console.log(this.user);
      // },(error : AppError) => {
        
      //   if(error instanceof BadInput) {
      //     alert('Merci de vérifié vos information !! ')
      //   }else{
      //     alert('error inattendu');
      //   }
      // })
     // this.router.navigate(['/house']);
  }

}
