import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { JxToasterComponent } from "./jx-toaster.component";

@NgModule({
  declarations: [JxToasterComponent],
  imports: [CommonModule, BrowserModule],
  exports: [JxToasterComponent]
})
export class JxToasterModule {}
