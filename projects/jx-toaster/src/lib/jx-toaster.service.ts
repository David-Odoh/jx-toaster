import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface ToasterConfig {
  singleton: Boolean;
  duration: number;
  position: String;
  animation: String;
  maxToast: number;
}

export interface Toast {
  type: String;
  title: String;
  body: String;
  showCloseButton: Boolean;
}

export const Positions = {
  /* Bottom */
  "toast-bottom-left": "bottom: 45px; left: 10px;",
  "toast-bottom-center": "bottom: 45px; left: 50%;",
  "toast-bottom-right": "bottom: 45px; right: 10px;",
  /* Top */
  "toast-top-left": "top: 45px; left: 10px;",
  "toast-top-center": "top: 45px; left: 50%;",
  "toast-top-right": "top: 45px; right: 10px;",
  /* Center */
  "toast-center-left": "top: 50%; left: 10px;",
  "toast-center-right": "top: 50%; right: 10px;"
};

export const Animations = [];

export const SkinColor = [
  { name: "Danger", value: "#d72f3f" },
  { name: "Warning", value: "#ffb700" },
  { name: "Success", value: "#40ad79" }
];

@Injectable({
  providedIn: "root"
})
export class JxToasterService {
  private _toast = new BehaviorSubject<Toast>(null);

  jx_toast = this._toast.asObservable();

  constructor() {}

  pop(_type, _title, _body, _scBtn) {
    let toast: Toast = {
      type: _type,
      title: _title,
      body: _body,
      showCloseButton: _scBtn
    };
    this._toast.next(toast);
  }
}
