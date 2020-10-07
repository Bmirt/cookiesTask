import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { ModalComponent } from './modal/modal.component';
import { CookiesService } from './cookies.service';
import { Banner } from './models/Banner';
import { Cookie } from './models/Cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _destruct$ = new Subject();
  public cookiesList: Array<Cookie>;
  public modalComponent = ModalComponent;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private _cookiesService: CookiesService
  ) {}

  ngOnInit() {
    this._cookiesService.getCookies().subscribe((cookies: Banner) => {
      this.cookiesList = cookies.accordian.map((cookie) => {
        return { ...cookie, Collapsed: false };
      });
    });
  }

  renderModal() {
    const modalFactory = this.componentFactoryResolver.resolveComponentFactory(
      ModalComponent
    );
    const modalRef = this.viewContainerRef.createComponent(modalFactory);
    modalRef.instance.cookiesList = this.cookiesList;
    modalRef.instance.destroyModal
      .pipe(delay(300), takeUntil(this._destruct$))
      .subscribe((destroy: boolean) => {
        if (destroy) {
          modalRef.destroy();
        }
      });

    // In case app didn't finish fetching data when dynamic modal is created
    // We ask from the modal to update input
    modalRef.instance.collapseCookies
      .pipe(takeUntil(this._destruct$))
      .subscribe((collapse: boolean) => {
        if (collapse) {
          modalRef.instance.cookiesList = this.cookiesList;
        }
      });
  }

  ngOnDestroy() {
    this._destruct$.next();
  }
}
