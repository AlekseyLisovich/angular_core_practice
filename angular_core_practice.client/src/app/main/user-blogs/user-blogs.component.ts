import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BlogService } from '../../services/blog.service';
import { Card } from '../../models/card';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-blogs',
  templateUrl: './user-blogs.component.html',
  styleUrls: ['./user-blogs.component.css']
})
export class UserBlogsComponent implements OnInit {

  currentUser: User;
  content: string;
  blogTitle: string;
  cards: Card[] = [];

  constructor(private blogService: BlogService, private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem("current_user"));

    this.blogService.getBlogsByUser(this.currentUser.id).subscribe(
      (cards) => {
        for (var card of cards) {
          card.author = this.currentUser.username;
          this.cards.push(card);
        }
      },
      err => {
        console.log('cannot get cards');
      }
    );
  }

  addBlog() {
    if(this.blogTitle){
      this.blogService.addBlog(this.currentUser.id, this.blogTitle).subscribe(
        (card: Card) => {
          if (card) {
            this.cards.push(card);
            this.toastr.success('Card has been successfully added','Success');
          } else {
            this.toastr.error('No card has been added', 'Error');
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.toastr.error('Title can\'t be empty', 'Error');
    }
  }

  editBlog(eventObj: any){
    this.blogService.editBlog(this.currentUser.id, eventObj.id, eventObj.title).subscribe(
      (card: Card) => {
        if (card) {
          this.toastr.success('Card has been successfully changed','Success');
        } else {
          this.toastr.error('Something went wrong', 'Error');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteBlog(id:number){
    this.blogService.deleteBlog(this.currentUser.id, id).subscribe(
      (res) => {
        if (res) {
          this.cards = this.cards.filter(c => c.id !== id);
          this.toastr.success('Card has been successfully deleted','Success');
        } else {
          this.toastr.error('Something went wrong', 'Error');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
