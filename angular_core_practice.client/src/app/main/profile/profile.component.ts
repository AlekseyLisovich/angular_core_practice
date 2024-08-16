import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  currentUser: User;

  constructor(private formBuilder: FormBuilder,
              private service: AccountService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem("current_user"));

    this.form = this.formBuilder.group({
      username: [this.currentUser.username, [Validators.minLength(4), Validators.maxLength(20)]],
      email: [this.currentUser.email, [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [this.currentUser.password, [Validators.minLength(4), Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    this.service.update(this.currentUser.id, this.form).subscribe(
      (res: any) => {
        if (res) {
          localStorage.setItem('current_user', JSON.stringify(res));
          this.toastr.success('User has been successfully updated','Profile');
        } else {
          this.toastr.error('Update failed', 'Profile');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  get profileForm(): any { return this.form.controls; }
}
