import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import {
  JxToasterModule,
  JxToasterService
} from "projects/jx-toaster/src/public-api";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, JxToasterModule],
  providers: [JxToasterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
