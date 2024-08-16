import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { BlogsComponent } from './blogs/blogs.component';
import { UserBlogsComponent } from './user-blogs/user-blogs.component';
import { PostsComponent } from './posts/posts.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component'

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: 'posts', component: BlogsComponent },
      { path: 'userposts', component: UserBlogsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'profile', component: ProfileComponent},
      { path: 'posts/:Id/:userId', component: PostsComponent },
      { path: 'userposts/:Id/:userId', component: UserPostsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }