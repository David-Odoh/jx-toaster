import {
  Component,
  OnInit,
  Input,
  HostBinding,
  OnDestroy
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {
  JxToasterService,
  ToasterConfig,
  Toast,
  Positions,
  SkinColor
} from "./jx-toaster.service";
import { Subscription } from "rxjs";

@Component({
  selector: "jx-toaster",
  template: `
    <div class="jx" *ngFor="let _toast of _toasts; let i = index">
      <div
        class="toast-container fadeIn"
        [style.left]="containerLeft ? '-50%' : '0'"
        [style.background-color]="colorChooser(_toast?.type)"
      >
        <span class="title" *ngIf="_toast?.title">{{ _toast?.title }}</span>
        <span class="message" *ngIf="_toast?.body"
          ><br />{{ _toast?.body }}</span
        >
        <span
          class="close-btn"
          *ngIf="_toast?.showCloseButton"
          (click)="remove(i)"
          >&times;</span
        >
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        position: absolute;
        bottom: 45px;
        background: transparent;
        // left: 50%;
        z-index: 2147483647;
      }

      :host.hide {
        display: none !important;
      }

      .toast-container {
        position: relative;
        background: #fff;
        padding: 14px 26px;
        min-width: 270px;
        margin-top: 14px;
        border-radius: 5px;
        font-size: 16px;
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
          0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);

        background: #d72f3f;
        color: #fff;
      }

      .toast-container span:not(.close-btn) {
        line-height: 22px;
      }

      .toast-container .title {
        font-weight: Bold;
      }

      .toast-container .close-btn {
        position: absolute;
        top: 2px;
        right: 8px;
        cursor: pointer;
        font-size: 24px;
        font-weight: bold;
      }

      .toast-container.fadeIn {
        -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
        -o-animation: fadein 2s; /* Opera < 12.1 */
        animation: fadein 2s;
      }

      @keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* Firefox < 16 */
      @-moz-keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* Safari, Chrome and Opera > 12.1 */
      @-webkit-keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* Internet Explorer */
      @-ms-keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `
  ]
})
export class JxToasterComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  @Input() toasterconfig: ToasterConfig;
  @HostBinding("class.hide") hide = true;

  _toasts: Toast[] = [];
  _posistions = Positions;
  containerLeft = false;

  @HostBinding("style")
  get positionStyles() {
    if (this.toasterconfig) {
      if (
        this.toasterconfig.position.substr(
          this.toasterconfig.position.lastIndexOf("-") + 1
        ) == "center"
      )
        this.containerLeft = true;
      else this.containerLeft = false;

      // Apply style to host element
      return this.sanitizer.bypassSecurityTrustStyle(
        this._posistions[`${this.toasterconfig.position}`]
      );
    } else {
      return "toast-bottom-left";
    }
  }

  constructor(private sanitizer: DomSanitizer, private $jx: JxToasterService) {
    this.subscriptions.add(
      this.$jx.jx_toast.subscribe(toast => {
        if (toast) {
          this.hide = false;
          // If Toast is open and there's a duration, countdown and close Toast
          // For Singleton
          if (!this.hide && this.toasterconfig.singleton) {
            if (this.toasterconfig.duration) {
              this._toasts.pop();
              this._toasts.push(toast);

              setTimeout(() => {
                this.close();
              }, (this.toasterconfig.duration += this.toasterconfig.duration));
            }
          } else {
            // For Non-Singleton
            let maxNumberofToaster;
            if (this.toasterconfig.maxToast)
              maxNumberofToaster = this.toasterconfig.maxToast;
            else maxNumberofToaster = 5;

            if (this._toasts.length < maxNumberofToaster)
              this._toasts.unshift(toast);

            setTimeout(() => {
              this._toasts.pop();
            }, this.toasterconfig.duration);
          }
        }
      })
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  remove(i) {
    this._toasts = this._toasts.filter(t => t != this._toasts[i]);
  }
  close() {
    this.hide = true;
  }

  colorChooser(type: String = "Danger") {
    type = this.capitalizeFirstLetter(type);
    let colors = SkinColor;
    let color: any = colors.filter(c => c.name == type);
    if (color) return color[0].value;
    return "#d72f3f"; //Danger
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
