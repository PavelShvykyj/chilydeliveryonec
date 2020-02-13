import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IWEBGood } from './models/web.good';
import { FireService } from './services/fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'deliveryonec';
  goods$: Observable<IWEBGood[]>;

  constructor(private db : FireService) {
    
    this.goods$ = db.getWebGoods();

  }

  LogOut() {
 
  }

}
