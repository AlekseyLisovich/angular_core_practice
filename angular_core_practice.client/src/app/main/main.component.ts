import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentUser: User;

  constructor(private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("current_user"));
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    this.router.navigate(['/account/login']);
  }

}
