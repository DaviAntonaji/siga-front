import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;  


        return this.verifyLogin(url);
    }

    verifyLogin(url:any ) : any{
        if(!this.isLoggedIn()){
            this.router.navigate(['/login']);
            return false;
        }
        else if(this.isLoggedIn()){
            return true;
        }
    }
    public isLoggedIn(): boolean{
        let status = false;

        if( localStorage.getItem('uid') != null &&  localStorage.getItem('uid') != undefined &&  localStorage.getItem('uid') != 'undefined'){

          status = true;
        }
        else{

          status = false;
        }
        return status;
    }
}