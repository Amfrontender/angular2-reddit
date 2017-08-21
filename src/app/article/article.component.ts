import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() title;
  @Input() applink;
  @Input() votes;
  @Output() onVotedUp = new EventEmitter<boolean>();
  @Output() onVotedDown = new EventEmitter<boolean>();
  voted = false;

  constructor() {

  }
  voteUp(): boolean {
    console.log("Vote Up");
    this.onVotedUp.emit(true);
    return false;
  }
  voteDown(): boolean {
    console.log("Vote Down");
    this.onVotedDown.emit(true);
    return false;
  }

  ngOnInit() {
  }

}
