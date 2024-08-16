import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'blog-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() id: number;
  @Input() userId: number;
  @Input() title: string = "";
  @Input() username: string = "";
  @Input() imageId: number;
  @Input() createdate: Date;

  constructor() { }

  getImagePath(){
    let photoId = +this.imageId + 10;
    return "https://picsum.photos/id/" + photoId + "/200/300"
  }

  ngOnInit(): void {
  }

}
