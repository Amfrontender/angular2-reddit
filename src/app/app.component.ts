import { Component  } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  items: FirebaseListObservable<any[]>;
  votesValue: FirebaseObjectObservable<any[]>;
  voteVal: any;

  constructor(private db: AngularFireDatabase) {
    this.items = db.list('/items', {
      query: {
        orderByKey: true
      }
    });
    this.votesValue = db.object('/items')
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

  voteUp(item: any): boolean {
    const itemObservable = this.db.object(`/items/${item}`);
    const itemSubscribe = this.db.object(`/items/${item}`).subscribe(res =>
      this.voteVal = res.votes
    );
    this.voteVal ++;
    itemObservable.update({votes: this.voteVal});
    return false;
  }

  voteDown(item): boolean {
    const itemObservable = this.db.object(`/items/${item}`);
    const itemSubscribe = this.db.object(`/items/${item}`).subscribe(res =>
      this.voteVal = res.votes
    );
    this.voteVal --;
    if (this.voteVal < 0) {
      this.voteVal = 0;
    }
    itemObservable.update({votes: this.voteVal});
    return false;
  }
}
