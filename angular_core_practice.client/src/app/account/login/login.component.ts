import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  users: User[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private service: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/main/posts');

    this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get loginForm():any { return this.form.controls; }

  onSubmit() {
    this.service.getAll().subscribe(
      (res: any) => {
        this.users=res;
        if(this.IsExist(this.form.value.username, this.form.value.password)){
          localStorage.setItem('token', 'access_token');
          this.router.navigateByUrl('/main/posts');
        } else {
          this.toastr.error('Incorrect username or password.');
        }
      },
      err => {
          this.toastr.error(err);
      }
    );
  }

  private IsExist(username: string, password: string){
    for (let user of this.users) {
      if(user.username.includes(username) && user.password.includes(password))
      {
        localStorage.setItem('current_user', JSON.stringify(user));
        return true;
      }
    }
    return false;
  }

}
