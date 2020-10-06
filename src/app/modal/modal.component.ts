import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Cookie } from '../models/Cookie';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @Input() cookiesList: Array<Cookie>;
  @Output() destroyModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  public collapse = true;
  public isCaretRotated = false;

  @ViewChild('cookieModal') modal: ModalDirective;

  ngAfterViewInit(): void {
    this.modal.show();
    console.warn(this.cookiesList);
  }

  hideModal() {
    this.modal.hide();
    this.destroyModal.emit(true);
  }
}
