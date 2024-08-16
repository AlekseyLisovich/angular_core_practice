import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'editable-blog-card',
  templateUrl: './editable-card.component.html',
  styleUrls: ['./editable-card.component.css']
})
export class EditableCardComponent implements OnInit {

  @Input() id: number;
  @Input() userId: number;
  @Input() title: string = "";
  @Input() username: string = "";
  @Input() imageId: number;
  @Input() createdate: Date;
  @Output() editCardEvent = new EventEmitter<any>(); 
  @Output() deleteCardEvent = new EventEmitter<number>();

  isSelected: boolean = false;
  isEditable: boolean = false;

  constructor() { }

  getImagePath(){
    let photoId = +this.imageId + 10;
    return "https://picsum.photos/id/" + photoId + "/200/300"
  }

  ngOnInit(): void {
  }

  switchEditStatus(){
    this.isEditable = !this.isEditable;
  }

  editCard(id: number){
    this.isEditable = false;
    this.editCardEvent.emit({id: id, title: this.title});
  }

  removeCard(id:number) {
    this.deleteCardEvent.emit(id);
  }

  @HostListener("mouseenter") onMouseEnter() {
    this.isSelected = true;
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.isSelected = false;
  }

}
