import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: AccountService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passwords: this.formBuilder.group({
          password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
          confirmpassword: ['', Validators.required]
      }, { validator: this.comparePasswords })
    });
  }

  onSubmit() {
    this.service.register(this.form).subscribe(
      (res: any) => {
        if (res) {
          this.form.reset();
          this.router.navigateByUrl('/account/login');
          this.toastr.success('User has been successfully created','Registration');
        } else {
          this.form.reset();
          this.toastr.error('Registration failed', 'Registration');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  get registerForm():any { return this.form.controls; }
  get passwordField():any { return this.form.get('passwords.password'); }
  get confirmPasswordField():any { return this.form.get('passwords.confirmpassword'); }

  private comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('confirmpassword');

    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
        if (fb.get('password').value != confirmPswrdCtrl.value)
            confirmPswrdCtrl.setErrors({ passwordMismatch: true });
        else
            confirmPswrdCtrl.setErrors(null);
    }
  }

}
