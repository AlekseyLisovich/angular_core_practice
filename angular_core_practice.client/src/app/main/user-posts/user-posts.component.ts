import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../services/post.service';
import { User } from '../../models/user';
import { Post } from '../../models/post';

@Component({
  selector: 'user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  blodId: number;
  userId: number;
  postContent: string;
  postTitle: string;
  currentUser: User;
  posts: Post[];

  constructor(private activateRoute: ActivatedRoute,
              private postService: PostService,
              private toastr: ToastrService)
  {
      this.activateRoute.params.subscribe(
        params => {
           this.blodId = params['Id'];
        });
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("current_user"));

    this.postService.getAllPost(this.currentUser.id, this.blodId).subscribe(
      (posts) => {
        this.posts = posts;
      },
      err => {
        console.log('cannot get posts');
      });
  }

  addPost() {
    this.postService.addPost(this.currentUser.id, this.blodId, this.postTitle, this.postContent).subscribe(
      (post: Post) => {
        if (post) {
          this.posts.push(post);
          this.toastr.success('Post has been successfully added','Success');
        } else {
          this.toastr.error('No post has been added', 'Error');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  editPost(eventObj: any){
    this.postService.editPost(this.currentUser.id, this.blodId, eventObj.id, eventObj.title, eventObj.content).subscribe(
      (post: Post) => {
        if (post) {
          this.toastr.success('Post has been successfully changed','Success');
        } else {
          this.toastr.error('Something went wrong', 'Error');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  deletePost(id:number){
    this.postService.deletePost(this.currentUser.id, this.blodId, id).subscribe(
      (post: Post) => {
        if (post) {
          this.posts = this.posts.filter(p => p.id !== post.id);
          this.toastr.success('Post has been successfully deleted','Success');
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
