import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectHeaderText } from 'src/app/ngrx/header.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  headerText$ = this.store.select(selectHeaderText);
  constructor(private store: Store) {
    this.headerText$.subscribe(console.log);
  }
}
