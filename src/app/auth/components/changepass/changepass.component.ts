import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { AuthAbsComponent } from '../auth-abs.component';

import { AuthenticationService } from '../../services/authentication.service';
import { USERS, LOCALSTORAGE, AUTH } from 'app/shared/constants';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
})

export class ChangepassComponent extends AuthAbsComponent implements OnInit, OnChanges {

  loading: boolean = false;
  otherError: string;
  currentUser: any = {};
  constructor(
    route: ActivatedRoute,
    router: Router,
    fb: FormBuilder,
    authenticationService: AuthenticationService,
  ) {
    super(route, router, fb, authenticationService);
  }

  ngOnChanges() {
    this.authForm.reset({
      newPass: '',
      newPassConfirm: '',
    });
  }

  ngOnInit() {
    const currUser = JSON.parse(localStorage.getItem(LOCALSTORAGE.crUser));
    if (!currUser || !currUser.access_token) {
      this.router.navigateByUrl('/auth/login');
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.currentUser = JSON.parse(localStorage.getItem(LOCALSTORAGE.crUser));
    if (this.currentUser) {
      if (this.currentUser.access_token && !this.currentUser.firstTime) {
        this.router.navigateByUrl(this.returnUrl);
        return true;
      }
    }
  }

  createForm() {
    this.validationMessages = {
      required: 'Please enter Password',
      pattern: AUTH.patternError.password,
      invalidFormat: 'Invalid Input',
    }
    this.formErrors = {
      newPass: null,
      newPassConfirm: null
    }
    this.authForm = this.fb.group({
      newPass: [null, [
        Validators.required,
        // Validators.minLength(AUTH.minlengthValidators.password),
        Validators.pattern(AUTH.patternValidators.password)
      ]],
      newPassConfirm: [null, [
        Validators.required,
        // Validators.minLength(AUTH.minlengthValidators.password),
        Validators.pattern(AUTH.patternValidators.password)
      ]],
    });
    this.authForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data);
      });
    this.onValueChanged();
  }

  updateItemData(data: any) {
    if (!data) return;
    this.authData = {
      newPass: data.newPass,
      newPassConfirm: data.newPassConfirm,
    };
  }

  onSubmit() {
    this.loading = true;
    this.authenticationService.changepass(this.currentUser.user.username, this.authData.oldPass, this.authData.newPass)
      .subscribe(
      data => {
        this.loading = false
        this.authenticationService.logout();
        this.router.navigateByUrl(this.returnUrl);
      },
      err => {
        this.loading = false
        const errMessage = err.json();
        if (err.status = 400) {
          this.apiError = errMessage.error;
        }
      },
      () => this.loading = false
    );
  }

  onValueChanged(data?: any): void {
    if (!this.authForm) { return; }
    const form = this.authForm;

    this.updateItemData(data);
    this.otherError = null;
    this.apiError = null;
    this.checkNewPassNotDefault();
    this.matchingPasswords();

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages;
        for (const key in control.errors) {
          this.formErrors[field] = messages[key];
        }
      }
    }
  }

  matchingPasswords() {
    const _newPass = this.authForm.controls.newPass;
    const _newPassConfirm = this.authForm.controls.newPassConfirm;
    if (_newPassConfirm.value && (_newPass.value !== _newPassConfirm.value)) {
      // _newPassConfirm.setErrors({ notEquivalent: true })
      this.otherError = AUTH.patternError.notEquivalentPassword;
    }
  }

  checkNewPassNotDefault() {
    const _newPass = this.authForm.controls.newPass;
    if (_newPass.value === USERS.PASS_DEFAULT) {
      // this.authForm.controls.newPass.setErrors({ 'notDefault': true })
      this.otherError = AUTH.patternError.notDefaultPassword;
    }
  }
}
