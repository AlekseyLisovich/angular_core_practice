import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'newsletter',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent implements OnInit {

	@Input()
    user: User;

    @Output()
    subscribe = new EventEmitter();

    subscribeToNewsletter(email:string) {
        this.subscribe.emit(email);
    }

	ngOnInit(): void {
	}

}

export interface User {
    firstName:string;
    lastName:string;
}

export class Todo {
    constructor(public id: number, 
        public description: string, 
        public completed: boolean, 
        public owner: Owner) {
    }
}

export class Owner {
    constructor( 
        public firstname: string, 
        public lastName: string) {
    }
}
