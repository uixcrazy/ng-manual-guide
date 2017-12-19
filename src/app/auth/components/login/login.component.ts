import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { LOCALSTORAGE } from 'app/shared/constants';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit, OnChanges {
  public loading: boolean;
  // private firstTimeInit: boolean = true;
  public authForm: FormGroup;
  public formErrors: any = {};
  private returnUrl: string;
  public apiError: string;
  public authData: any = {};
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected authenticationService: AuthenticationService,
  ) {
    this.createForm();
    this.loading = false;
  }

  ngOnChanges() {
    this.authForm.reset({
      username: '',
      password: '',
    });
    // this.firstTimeInit = true;
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (localStorage.getItem(LOCALSTORAGE.crUser)) {
      this.router.navigateByUrl(this.returnUrl);
      return true;
    }
  }

  createForm() {
    this.authForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.formErrors = {
      username: null,
      password: null,
    }
    this.authForm.valueChanges
      .subscribe(data => {
        this.onValueChanged(data);
      });
    this.onValueChanged();
  }

  onValueChanged(data?: any): void {
    if (!this.authForm) { return; }
    const form = this.authForm;

    this.updateItemData(data);
    this.apiError = null;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        for (const key in control.errors) {
          this.formErrors[field] = 'Invalid Input';
        }
      }
    }
  }

  updateItemData(data: any) {
    if (!data) return;
    // if (this.firstTimeInit) {
    //   this.firstTimeInit = !this.firstTimeInit;
    //   // hardcode ↓↓↓ by hhd
    // }

    this.authData = {
      username: data.username,
      password: data.password,
    };
  }

  onSubmit() {
    this.loading = true;
    this.authenticationService.login(this.authData.username, this.authData.password)
      .subscribe(
      data => {
        this.loading = false;
        if (data.firstTime) {
          this.router.navigateByUrl('/auth/changepass');
        } else {
          this.router.navigateByUrl(this.returnUrl); // navigate([this.returnUrl]);
        }
      },
      err => {
        this.loading = false
        if (err.headers && !err.headers.ok) {
          this.apiError =
          `<p>Your Username or Password is incorrect.</p>
          <p>Please try again</p>`;
        } else {
          this.apiError = err;
        }
      },
      () => this.loading = false
    );
  }
}
