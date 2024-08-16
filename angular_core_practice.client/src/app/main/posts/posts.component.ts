import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { User } from '../../models/user';
import { Post } from '../../models/post';

@Component({
  selector: 'app-details',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  blodId: number;
  userId: number;
  currentUser: User;
  posts: Post[];

  constructor(private activateRoute: ActivatedRoute,
    private postService: PostService) {
      this.activateRoute.params.subscribe(
        params => {
           this.blodId = params['Id'];
           this.userId = params['userId'];
        });
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("current_user"));

    this.postService.getAllPost(this.userId, this.blodId).subscribe(
      (posts) => {
        this.posts = posts;
      },
      err => {
        console.log('cannot get posts');
      });
  }

}
