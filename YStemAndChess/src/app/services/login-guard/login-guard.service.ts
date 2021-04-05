import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, ActivatedRoute, RoutesRecognized  } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })

// An Authentication Guard for routes based on LoggedIn status
export class LoginGuardService implements CanActivate {
    constructor(private router: Router, private route: ActivatedRoute, private cookie: CookieService) {

    }

    private isLoggedIn;
    private roles: Array<string>;  // The roles that are allowed to pass, any if empty
    private redirect: boolean;     // Whether this route should redirect to home if logged in
    private userData;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.isLoggedIn = this.cookie.get('login');
        this.roles = route.data['roles'] as Array<string>;
        this.redirect = route.data['redirect'];
               
       if (this.redirectIfLoggedIn()) {
           this.router.navigate(['/']);
           return false;
       }

       if (this.allowThrough()) {
           return true;
       }

       this.router.navigate(['/']);
       return false;
    }

    private redirectIfLoggedIn(): boolean {
        if (this.isLoggedIn) {
            if (this.redirect) {
                return true;
            }
        }
        return false;
    }

    private allowThrough(): boolean {
        let allow: boolean = false;

        if (!this.isLoggedIn) {
            if (this.redirect) {
                allow = true;
            }
        }

        if (this.isLoggedIn) {
            this.userData = JSON.parse(atob(this.isLoggedIn.split(".")[1]));
            if (!this.roles) {
               allow = true;
            } else {
                for (const role of this.roles) {
                    if (this.userData.role == role) {                
                        allow = true;                
                    } 
                }
            }

        } 
        
        return allow;
    }
 }