import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {

	user: User = {
        firstName: 'Alice',
        lastName: 'Smith'
    };

    constructor() {

    }

    subscribe(email:string) {

    }

	ngOnInit(): void {
	}

}

export interface User {
    firstName:string;
    lastName:string;
}
