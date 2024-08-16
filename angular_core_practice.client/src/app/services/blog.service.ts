import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card';
import { Observable } from 'rxjs';

@Injectable()
export class BlogService {

    constructor(private http: HttpClient) { }
    readonly BaseURI = 'https://localhost:7232';

    getBlogsByUser(userId): Observable<Card[]>{
        return this.http.get<Card[]>(`${this.BaseURI}/Blog/GetBlogsByUser/` + userId);
    }

    addBlog(userId, title): Observable<Card>{
        const body = {title: title, createdAt: new Date()};
        return this.http.post<Card>(`${this.BaseURI}/Blog/AddBlog/${userId}`, body);
    }

    editBlog(userId, blogId, title): Observable<Card>{
        const body = {title: title};
        return this.http.put<Card>(`${this.BaseURI}/Blog/EditBlog/${blogId}`, body);
    }

    deleteBlog(userId, blogId): Observable<boolean>{
        return this.http.delete<boolean>(`${this.BaseURI}/Blog/DeleteBlog/${blogId}`);
    }
}
