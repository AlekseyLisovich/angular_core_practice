import { Component, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { User } from '../../models/user';
import { BlogService } from '../../services/blog.service';
import { AccountService } from '../../services/account.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  currentUser: User;
  content: string;
  cards: Card[] = [];

  constructor(private blogService: BlogService,
    private accService: AccountService
  ) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem("current_user"));

    this.GetAllCards();
  }

  GetAllCards(){
    this.cards = [];
    this.accService.getAll().pipe(
      switchMap((users: User[]) => {
        let observableCardsArray: Observable<Card[]>[] = [];
        users.forEach(user => {
          let observableCards: Observable<Card[]> = this.blogService.getBlogsByUser(user.id).pipe(
            map(cards => cards.map(c => new Card(c.id, c.userId, c.createdAt, user.username, c.title)))
          );
          observableCardsArray.push(observableCards);
        });
        return forkJoin(observableCardsArray);
      })
    ).subscribe(
      (cardsArray) => {
        cardsArray.forEach(cards => {
          cards.forEach(card => {
            this.cards.push(card);
          })
        })
      },
      err => {
        console.log('cannot get cards');
      }
    );;
  }

  GetAllCards1(){
    this.cards = [];
    this.accService.getAll().subscribe((users: User[]) => {
      for(var user of users){
        this.GetUserCards(user.id, user.username);
      }      
    });
  }

  private GetUserCards(userId, username){
    this.blogService.getBlogsByUser(userId).subscribe(
      (cards) => {
        for(var card of cards){    
          card.author = username;       
          this.cards.push(card);
        }
      },
      err => {
        console.log('cannot get cards');
      }
    );
  }

}
