import { Component } from "@angular/core";
import {
  JxToasterService,
  ToasterConfig,
  Toast
} from "projects/jx-toaster/src/public-api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "jx-toaster-showcase";

  public config: ToasterConfig = {
    singleton: false,
    duration: 50000,
    position: "toast-top-right",
    animation: "fadeIn",
    maxToast: 5
  };

  constructor(private $jx_service: JxToasterService) {}

  popToastDanger() {
    this.$jx_service.pop(
      "danger",
      "My Title",
      "Short message goes here. - Danger",
      true
    );
  }
  popToastSuccess() {
    this.$jx_service.pop(
      "Success",
      "My Title",
      "Short message goes here. - Success",
      true
    );
  }
  popToastWarning() {
    this.$jx_service.pop(
      "warning",
      "My Title",
      "Short message goes here. - Warning",
      true
    );
  }
}
