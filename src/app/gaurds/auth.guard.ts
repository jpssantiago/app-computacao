import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { SigninPage } from '../signin/signin.page'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
      private UserService: UserService,
      private router: Router
      ){ }


    canActivate(): Promise<boolean> {
      return new Promise(resolve => {
        this.UserService.getAuth().onAuthStateChanged(user => {
          if (user) this.router.navigate(["welcome"]);

          resolve(!user ? true : false);
          })
        });
      }
    } 
