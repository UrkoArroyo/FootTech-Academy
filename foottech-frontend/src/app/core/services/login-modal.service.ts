import { Injectable, signal, Signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginModalService {
  private _show = signal(false);
  readonly show: Signal<boolean> = this._show;

  open() {
    this._show.set(true);
  }

  close() {
    this._show.set(false);
  }

  toggle() {
    this._show.update(v => !v);
  }
}
