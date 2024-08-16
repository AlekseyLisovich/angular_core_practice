import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {

    constructor(private http: HttpClient) { }
    readonly BaseURI = 'https://60b6545117d1dc0017b8794b.mockapi.io/api';

    getAllPost(userId, blogId): Observable<Post[]>{
        return this.http.get<Post[]>(this.BaseURI + '/users/'+userId+'/blogs/'+blogId+'/posts');
    }

    addPost(userId, blodId, title, content): Observable<Post>{
        const body = {title: title, content: content, createdAt: new Date()};
        return this.http.post<Post>(this.BaseURI + '/users/'+userId+'/blogs/'+blodId+'/posts/', body);
    }

    editPost(userId, blogId, id, title, content): Observable<Post>{
        const body = {title: title, content: content };
        return this.http.put<Post>(this.BaseURI + '/users/'+userId+'/blogs/'+blogId+'/posts/'+id, body);
    }

    deletePost(userId, blogId, id): Observable<Post>{
        return this.http.delete<Post>(this.BaseURI + '/users/'+userId+'/blogs/'+blogId+'/posts/'+id);
    }
}
