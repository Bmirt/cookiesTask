import { OnInit } from '@angular/core';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Cookie } from '../models/Cookie';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() cookiesList: Array<Cookie>;
  @Output() destroyModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() collapseCookies: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  public collapse = true;
  public isCaretRotated = false;

  @ViewChild('cookieModal') modal: ModalDirective;

  ngOnInit() {
    // There might be some cases when modal is rendered but parent component still didn't get the data from server
    // this code asks parent component to update cookiesList @Input every second until component gets it
    interval(1000)
      .pipe(takeWhile(() => !!!this.cookiesList))
      .subscribe(() => {
        this.collapseCookies.emit(true);
      });
  }

  ngAfterViewInit() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
    this.destroyModal.emit(true);
  }

  customize() {
    this.isCaretRotated = !this.isCaretRotated;
    this.collapseCookies.emit(true);
  }
}
