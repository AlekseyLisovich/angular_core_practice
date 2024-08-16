import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'editable-post',
  templateUrl: './editable-post.component.html',
  styleUrls: ['./editable-post.component.css']
})
export class EditablePostComponent implements OnInit {

  @Input() id: number;
  @Input() title: string = "";
  @Input() content: string = "";
  @Output() editPostEvent = new EventEmitter<any>(); 
  @Output() deletePostEvent = new EventEmitter<number>();

  isSelected: boolean = false;
  isEditable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  switchEditStatus(){
    this.isEditable = !this.isEditable;
  }

  editPost(id: number){
    this.isEditable = false;
    this.editPostEvent.emit({id: id, title: this.title, content: this.content});
  }

  removePost(id:number) {
    this.deletePostEvent.emit(id);
  }

  @HostListener("mouseenter") onMouseEnter() {
    this.isSelected = true;
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.isSelected = false;
  }

}
