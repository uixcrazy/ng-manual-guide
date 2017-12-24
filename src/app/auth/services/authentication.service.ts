import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import * as CryptoJS from 'crypto-js';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { ENDPOINTS } from 'app/shared/endpoints';
import { LOCALSTORAGE } from '../../shared/constants';


@Injectable()
export class AuthenticationService {
  private subject = new Subject<any>();
  private key = 'keykey';
  private iv = '#base64IV#';

  constructor(private http: Http) { }

  signin(username: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //Encrypt the Password
    //Man in the Middle Secure v1
    const key = CryptoJS.enc.Base64.parse(this.key);
    const iv  = CryptoJS.enc.Base64.parse(this.iv);
    const encrypted = CryptoJS.AES.encrypt(password, key, {iv: iv});

    //Save the Login in to an array
    const secureUsercreds =
    {
      username: username,
      password: encrypted.toString()
    };

    // const creds = 'name=' + secureUsercreds.username + '&password=' + secureUsercreds.password;
    // //Encrypt the whole body
    // const password = 'this.key';
    // const encrypted = CryptoJS.AES.encrypt(creds, password);
    // const encryptedmessage = encrypted.toString();

    // //POST ->
    // new Promise((resolve) => {
    //   try {
    //     this.http.post('http://localhost:8090/Auth', 'message=' + encryptedmessage, {headers: headers}).subscribe((data) => {

    //        //do Stuff..

    //     })
    //   } catch (err){}
    // })

    return this.http.post(ENDPOINTS.signin, {
      username: secureUsercreds.username,
      password: secureUsercreds.password
    }, { headers: headers })
    .map((response: Response) => {
      let user = response.json();
      if (user && user.access_token) {
        user.startTime = Date.now();
        localStorage.setItem(LOCALSTORAGE.crUser, JSON.stringify(user));
        this.subject.next({ result: 'succeed' });
      }
      return user;
    });
  }

  changepass(username: string, oldPassword: string, newPassword: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const key = CryptoJS.enc.Base64.parse(this.key);
    const iv  = CryptoJS.enc.Base64.parse(this.iv);
    const encryptedOldPassword = CryptoJS.AES.encrypt(oldPassword, key, {iv: iv});
    const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, key, {iv: iv});

    const _oldPassword = encryptedOldPassword.toString();
    const _newPassword = encryptedNewPassword.toString();
    return this.http.post(ENDPOINTS.changepass, {
      username,
      oldPassword: _oldPassword,
      newPassword: _newPassword
    })
    .map((response: Response) => response.json());
  }

  signup(username: string, password: string) {
    return;
  }

  refreshToken() {
    const crUserStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE.crUser));
    if (crUserStorage) {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('client:secret'),
      });

      return this.http.post(ENDPOINTS.refreshToken, {
        username : crUserStorage.user.username,
        refresh_token : crUserStorage.refresh_token
      },
      { headers: headers })
      .map((response: Response) => {
        let newToken = response.json();
        if (newToken && newToken.access_token) {
          crUserStorage.startTime = Date.now();
          const crUser = Object.assign({}, crUserStorage, {
            startTime: Date.now(),
            access_token: newToken.access_token,
            refresh_token: newToken.refresh_token,
            expires_in: newToken.expires_in
          });
          localStorage.removeItem(LOCALSTORAGE.crUser);
          localStorage.setItem(LOCALSTORAGE.crUser, JSON.stringify(crUser));
          this.subject.next({ result: 'succeed' });
        }
        return newToken;
      }).catch(error => {
        this.logout();
        return Observable.throw(error);
      });
    }
    return;
  }

  crUser(username: string, oldPassword: string, newPassword: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const key = CryptoJS.enc.Base64.parse(this.key);
    const iv  = CryptoJS.enc.Base64.parse(this.iv);
    const encryptedOldPassword = CryptoJS.AES.encrypt(oldPassword, key, {iv: iv});
    const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, key, {iv: iv});

    const _oldPassword = encryptedOldPassword.toString();
    const _newPassword = encryptedNewPassword.toString();
    return this.http.post(ENDPOINTS.signin, {
      username,
      oldPassword: _oldPassword,
      newPassword: _newPassword
    })
    .map((response: Response) => response.json());
  }

  logout() {
    const crUserStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE.crUser));
    localStorage.removeItem(LOCALSTORAGE.crUser);
    this.subject.next();
  }

  getMessage = (): Observable<any> => this.subject.asObservable()
}
