import { AuthGuardGuardGuard } from './guards/auth-guard-guard.guard';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseComponent } from './component/house/house.component';
import { PageNoutFoundComponent } from './component/page-nout-found/page-nout-found.component';


const routes: Routes = [
  {path: "", redirectTo: "house", pathMatch: 'full'  },
  {path: "house", component: HouseComponent , canActivate: [AuthGuardGuardGuard]},
  
  {path: "login" ,component: LoginComponent },
  {path: "register" ,component: RegisterComponent },
  {path: "**" , component: PageNoutFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
