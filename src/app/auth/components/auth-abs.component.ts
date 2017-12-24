import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { AUTH } from 'app/shared/constants';

@Component({
  providers: [AuthenticationService]
})

export abstract class AuthAbsComponent {
  authData: any = {};
  authForm: FormGroup;
  minlengthValidators: any = {};
  maxlengthValidators: any = {};
  patternValidators: any = {};
  createFormControl: any = {};
  patternError: any = {};
  formErrors: any = {};
  apiError: string;
  returnUrl: string;
  validationMessages: any;
  otherValidator: any;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected authenticationService: AuthenticationService,
  ) {
    this.formErrors = {
      username: null,
      password: null,
    }
    this.minlengthValidators = AUTH.minlengthValidators;
    this.maxlengthValidators = AUTH.maxlengthValidators;
    this.patternValidators = AUTH.patternValidators;
    this.patternError = AUTH.patternError;
    this.validationMessages = {
      username: {
        required: 'Please enter Username',
        pattern: this.patternError.username,
        invalidFormat: 'Invalid Input',
      },
      password: {
        required: 'Please enter Password',
        pattern: this.patternError.password,
        invalidFormat: 'Invalid Input',
      },
    } // ↓↓↓
    this.createFormControl = {
      username: [
        Validators.required,
        Validators.minLength(this.minlengthValidators.username),
        Validators.pattern(this.patternValidators.username)
      ],
      password: [
        Validators.required,
        Validators.minLength(this.minlengthValidators.password),
        Validators.pattern(this.patternValidators.password)
      ]
    }
    this.createForm();
  }

  abstract createForm(): void;
  abstract updateItemData(data: any);

  protected onValueChanged(data?: any): void {
    if (!this.authForm) { return; }
    const form = this.authForm;

    this.updateItemData(data);
    this.apiError = null;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] = messages[key];
        }
      }
    }
  }
}
