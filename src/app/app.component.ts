import { LoadOptions } from './option.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from './reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'deliveryonec';
 

  constructor(private store : Store<AppState>) {}

  LogOut() {
 
  }

  ngOnInit() {
    this.store.dispatch(LoadOptions());
  }

  OnExternal1CValueChange(el){
    if(el.value=="options") {
      this.store.dispatch(LoadOptions());

    }
    

  }


}
