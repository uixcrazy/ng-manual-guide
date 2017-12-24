import { Component, OnInit } from '@angular/core';

import { AuthAbsComponent } from '../auth-abs.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent  implements OnInit { // extends AuthAbsComponent

  constructor() { }

  ngOnInit() {
  }

}
