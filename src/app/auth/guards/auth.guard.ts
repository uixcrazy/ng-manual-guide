import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LOCALSTORAGE } from 'app/shared/constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currUser = JSON.parse(localStorage.getItem(LOCALSTORAGE.crUser));
    if (!currUser || !currUser.access_token) {
      this.router.navigate(['/auth/signin'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    if (currUser && currUser.access_token) {
      const currentUserStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE.crUser));
      const expires = currentUserStorage.expires_in * 1000; // milliseconds
      const timeCountDown = expires - (Date.now() - currentUserStorage.startTime);
      if (timeCountDown <= 0 ) {
        this.router.navigate(['/auth/signin'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      return true;
    }
  }
}
