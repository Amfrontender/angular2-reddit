import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class VoteService {
  items: FirebaseListObservable<any[]>;
  votesValue: FirebaseObjectObservable<any[]>;
  voteVal: any;

  constructor(private db: AngularFireDatabase) {
  }

  getVoteValue(target, action): Number {
    const itemObservable = this.db.object(`/items/${target}`);
    const itemSubscribe = this.db.object(`/items/${target}`).subscribe(res =>
      this.voteVal = res.votes
    );

    switch (action) {
      case 'voteUp':
        this.voteVal ++;
        break;
      case 'voteDown':
        this.voteVal --;
        if (this.voteVal < 0) {
          this.voteVal = 0;
        }
        break;
      default:
        return this.voteVal
    }
    itemObservable.update({votes: this.voteVal});
  }
}
