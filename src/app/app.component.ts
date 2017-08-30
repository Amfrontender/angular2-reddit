import { Component  } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

// Services
import { VoteService } from './vote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [VoteService]
})

export class AppComponent {
  items: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase, private _voteServices: VoteService) {
    this.items = db.list('/items', {
      query: {
        orderByKey: true
      }
    });
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    this.items.push({
      title: title.value,
      link:  link.value,
      votes: 0
    });
    title.value = '';
    link.value = '';
    return false;
  }

  voteUp(item): boolean {
    this._voteServices.getVoteValue(item, 'voteUp');
    return false;
  }

  voteDown(item): boolean {
    this._voteServices.getVoteValue(item, 'voteDown');
    return false;
  }
}
