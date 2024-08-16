import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { BlogService } from '../services/blog.service';
import { PostService } from '../services/post.service';
import { MainComponent } from './main.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from '../custom-cards/card/card.component';
import { BlogsComponent } from './blogs/blogs.component';
import { UserBlogsComponent } from './user-blogs/user-blogs.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from '../custom-cards/post/post.component';
import { EditableCardComponent } from '../custom-cards/editable-card/editable-card.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { EditablePostComponent } from '../custom-cards/editable-post/editable-post.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { TestComponent } from './settings/test/test.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSliderModule,
    MatInputModule,
    MatCardModule
  ],
  declarations: [
    MainComponent,
    DashboardComponent,
    CardComponent,
    BlogsComponent,
    UserBlogsComponent,
    PostsComponent,
    PostComponent,
    EditableCardComponent,
    UserPostsComponent,
    EditablePostComponent,
    SettingsComponent,
    ProfileComponent,
    TestComponent
  ],
  exports: [MainComponent],
  providers: [BlogService, PostService]
})
export class MainModule { }
