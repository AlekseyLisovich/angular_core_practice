import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class AccountService {

    constructor(private http: HttpClient) { }
    readonly BaseURI = 'https://localhost:7232';

    register(formModel): Observable<User> {
        let body = {
            username: formModel.value.username,
            email: formModel.value.email,
            password: formModel.value.passwords.password
        };
        return this.http.post<User>(`${this.BaseURI}/Account/Register`, body);
    }

    update(userId, formModel): Observable<User> {
        let body = {
            username: formModel.value.username,
            email: formModel.value.email,
            password: formModel.value.password
        };
        return this.http.put<User>(this.BaseURI + '/users/'+userId, body);
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${this.BaseURI}/Account/GetUsers`);
    }
}
