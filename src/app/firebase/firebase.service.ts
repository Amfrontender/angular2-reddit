import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  items: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/items');
  }
}
